import { invalidCharsMap, quotes } from "../constants";
import { CLOSING_TAG_REGEX, FLOAT_REGEX, INT_REGEX, INVALID_SYMBOLS_REGEX, SPACES_REGEX, STRING_DELIMTERS_REGEX } from "../constants/regex";
import JsonifyError from "../models/error";
import { JsonifyXMLParser, NodeAttributes, NodeValueParser } from "../types";
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

export function parseNodeAttributes(tag: string, tagname: string, valueParser?: NodeValueParser) {
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
                throw new JsonifyError(`XML JsonifyError: Expected value after <${tagname} ${splitedItem[0]}=? >`)
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
                const value = typeof item[1] === "string" ? parseAttributeValue(item[1]) : item[1];
                res[attributeName] = valueParser ? valueParser(value) : value;
            }
            return res;
        }, {} as NodeAttributes);
}

function parseAttributeValue(value: string) {
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
        throw new JsonifyError(`Invalid attribute value: The character '${firstChar}' is used as a delimiter, but it appears inside the value. Please escape or remove the internal '${firstChar}' or replace it by ${invalidCharsMap[firstChar as keyof typeof invalidCharsMap]}.`);    
    }     
    
    innerValue = innerValue
        .replace(/&quot;/g, '"')    // Replace &quot; with "
        .replace(/&apos;/g, "'")    // Replace &apos; with '
        .replace(/&lt;/g, '<')      // Replace &lt; with <
        .replace(/&gt;/g, '>')      // Replace &gt; with >
        .replace(/&amp;/g, '&');

    const invalidSymbols = innerValue.match(INVALID_SYMBOLS_REGEX);
    if (invalidSymbols && invalidSymbols.length > 0) {
        const firstInvalidSymbol = invalidSymbols[0] as keyof typeof invalidCharsMap;
        const equivalentSymbol = firstInvalidSymbol in invalidCharsMap ? ` by '${invalidCharsMap[firstInvalidSymbol]}'` : ""

        throw new JsonifyError(`Invalid symbol found: '${firstInvalidSymbol}' in value '${innerValue}'. Please remove or replace it${equivalentSymbol}.`);
    }

    return innerValue;
}