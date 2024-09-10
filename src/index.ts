import { XML_COMMENT_REGEX, XML_DOC_REGEX, XML_WHITE_SPACES_REGEX } from "./constants/regex";
import { chooseValueParser, parseNodeAttributes, parseValue } from "./helpers/parser";
import { isSelfClosingTag, closesOpenedTag, isValidAttributeName } from "./helpers/validators";
import JsonifyError from "./models/error";
import { JsonifyXMLBaseOptions, JsonifyXMLOptions, Node } from "./types";
import fs from "fs";

export function jsonify(options: string | JsonifyXMLOptions) {
    if(typeof options === "string") {
        return parseJson(options);
    }
    
    let xml = "";

    if("xml" in options) {
        xml = options.xml;
    } else if ("input" in options) {
        if (!fs.existsSync(options.input)) {
            throw new JsonifyError(`File not found: The specified file at path "${options.input}" does not exist.`);
        }
        
        xml = fs.readFileSync(options.input, "utf-8");
    }
    
    const json = parseJson(xml, options);

    if(options.output) {
        fs.writeFileSync(options.output, JSON.stringify(json), "utf-8");
    }

    return json;
}

function parseJson(xml: string, { parseAttributes = false, valueParser }: JsonifyXMLBaseOptions = {}) {
    xml = xml
        .trim()
        .replace(XML_WHITE_SPACES_REGEX, '><')
        .replace(XML_COMMENT_REGEX, '');

    const stack = [{
        attributes: {},
        nodes: {},
        tagname: "root"
    }] as Node[];

    const matches = Array.from(xml.matchAll(XML_DOC_REGEX));

    if(matches.length === 0) {
        throw new JsonifyError("Invalid XML: No valid tags found in the document. The structure may be malformed or empty.");
    }

    const parser = chooseValueParser(valueParser);
    const attributesParser = parseAttributes ? parser : undefined;

    matches.forEach((match, i) => {
        const tagname = match[1];
        const isClosing = !tagname;

        if(!isValidAttributeName(tagname)) {
            throw new JsonifyError(`Invalid XML tag name: "${tagname}". tag names must start with a letter or underscore and can only contain letters, digits, hyphens, underscores, and periods.`)
        }

        if(isClosing) {
            const openedTag = stack.pop();

            if(!openedTag) {
                throw new JsonifyError(`Invalid XML: Found closing tag ${match[0]} without a matching opening tag.`);
            }
            
            if(!closesOpenedTag(match[0], openedTag.tagname)) {
                throw new JsonifyError(
                    stack.length === 0 ?
                    `Invalid XML: Unexpected closing tag ${match[0]} without a corresponding opening tag.` :
                    `Invalid XML: Expected closing tag for <${openedTag.tagname} ...>, but found ${match[0]}.`
                );
            }
        } else {
            const parent = stack.at(stack.length - 1);
            const isSelfClosing = isSelfClosingTag(match[0]);
            const node: Node = { tagname };

            if(!isSelfClosing) {
                stack.push(node);
            }

            const attributes = parseNodeAttributes(match[0], match[1], attributesParser);

            if(Object.keys(attributes).length > 0) {
                node.attributes = attributes;
            }

            if(parent) {
                if(!parent.nodes) {
                    parent.nodes = {};
                }
                
                if(!parent.nodes[tagname]) {
                    parent.nodes[tagname] = node;
                } else if(!Array.isArray(parent.nodes[tagname])) {
                    parent.nodes[tagname] = [parent.nodes[tagname], node];
                } else {
                    parent.nodes[tagname].push(node);
                }
            }

            if(i + 1 < matches.length && matches[i + 1][0].startsWith("</") && matches[i + 1][0].includes(match[1])) {
                const startIndex = match.index + match[0].length;
                const endIndex = matches[i + 1].index;
                const value = xml.slice(startIndex, endIndex);

                node.value = value && parser ? parser(value) : value;
            }
        }
    });

    if(stack.length > 1) {
        throw new JsonifyError(`Invalid XML: Unclosed tag(s) detected. The tag <${stack[stack.length - 1].tagname}> is not closed.`);    
    } 

    const root = stack.at(0)?.nodes;

    if (stack.length === 0 || !root) {
        throw new JsonifyError("Invalid XML: The document was not fully processed, possible unclosed tags or malformed structure.");
    }

    return {
        [matches[0][1] || "$"]: root[matches[0][1]]
    };
}