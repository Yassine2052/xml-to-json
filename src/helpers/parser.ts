import { specialCharsMap, quotes } from "../constants";
import { CLOSING_TAG_REGEX, FLOAT_REGEX, INT_REGEX, INVALID_SYMBOLS_REGEX, SPACES_REGEX } from "../constants/regex";
import JsonifyError from "../models/error";
import { JsonifyXMLParser, NodeAttributes, NodeValueParser } from "../types";
import { sanitiseAttributeValue } from "./cleaners";
import { isValidAttributeName } from "./validators";

export function chooseValueParser(parser: JsonifyXMLParser = parseValue) {
    if(typeof parser === "string") {
        if(parser === "string") {
            return undefined
        }

        return parseValue;
    }

    return parser;
}

export function parseValue(value: string){
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;

    if(value.match(INT_REGEX)) {
        return Number.parseInt(value);
    }

    if(value.match(FLOAT_REGEX)) {
        return Number.parseFloat(value);
    }

    const date = Date.parse(value);

    return Number.isNaN(date) ? value : new Date(date);
}

export function parseNodeAttributes(tag: string, tagname: string, sanitize: boolean, valueParser?: NodeValueParser) {
    return tag
        .replace(new RegExp(`^<${tagname}`, "g"), '')
        .replace(CLOSING_TAG_REGEX, '')
        .trim()
        .split(SPACES_REGEX)
        .map(item => {
            const splitedItem = item
                .trim()
                .split('=')
                .filter(item => !!item.trim());
            
            if(splitedItem.length === 0) {
                return [];
            }

            if(splitedItem.length === 1) {
                throw new JsonifyError(`Expected value after <${tagname} ${splitedItem[0]}=? >`)
            }

            if(!isValidAttributeName(splitedItem[0])) {
                throw new JsonifyError(`Invalid XML attribute name: "${splitedItem[0]}". Attribute names must start with a letter or underscore and can only contain letters, digits, hyphens, underscores, and periods.`)
            }

            return [splitedItem[0], splitedItem.slice(1).join("=")];
        })
        .filter(item => item.length > 0)
        .reduce((res, item) => {
            const attributeName = item[0].trim();
            if(attributeName) {
                const value = typeof item[1] === "string" ? parseAttributeValue(item[1], sanitize) : item[1];

                res[attributeName] = valueParser ? valueParser(value) : value;
            }
            return res;
        }, {} as NodeAttributes);
}

function parseAttributeValue(value: string, sanitize: boolean) {
    value = value.trim();
    const firstChar = value[0];

    if(!quotes.includes(firstChar)) {
        throw new JsonifyError(`Invalid attribute value: Expected a quote (single or double) at the beginning, but found '${firstChar}' instead.`);
    }

    const lastChar = value[value.length - 1];

    if(lastChar !== firstChar) {
        throw new JsonifyError(`Invalid attribute value: Expected a '${firstChar}' at the end, but found '${lastChar}' instead.`);
    }

    let innerValue = value.slice(1, value.length - 1);

    if(innerValue.includes(firstChar)) {
        throw new JsonifyError(`Invalid attribute value: The character '${firstChar}' is used as a delimiter, but it appears inside the value. Please escape or remove the internal '${firstChar}' or replace it by ${specialCharsMap[firstChar as keyof typeof specialCharsMap]}.`);    
    }     
    
    if(sanitize) {
        innerValue = sanitiseAttributeValue(innerValue);

        const invalidSymbols = innerValue.match(INVALID_SYMBOLS_REGEX);

        if (invalidSymbols && invalidSymbols.length > 0) {
            const firstInvalidSymbol = invalidSymbols[0] as keyof typeof specialCharsMap;
            const equivalentSymbol = firstInvalidSymbol in specialCharsMap ? ` by '${specialCharsMap[firstInvalidSymbol]}'` : ""

            throw new JsonifyError(`Invalid symbol found: '${firstInvalidSymbol}' in value '${innerValue}'. Please remove or replace it${equivalentSymbol}.`);
        }
    }
    
    return innerValue;
}