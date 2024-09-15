
import { specialCharsMap } from ".";

// export const XML_DOC_REGEX = /<([a-zA-Z]+)(\s+[a-zA-Z]+=(".*?"|'.*?'))*\s*\/?>|<\/[a-zA-Z]+>/g;
// export const XML_DOC_REGEX = /<([a-zA-Z]+)(\s+[a-zA-Z]+=("|').*?("|'))*\s*\/?>|<\/[a-zA-Z]+>/g;
export const XML_DOC_REGEX = /<([\w.-]+)(\s+.+=("|').*?("|'))*\s*\/?>|<\/[\w.-]+>/g;
export const XML_WHITE_SPACES_REGEX = />?(\n|\r|\t|\s)+</g;
export const XML_COMMENT_REGEX = /<!--[\s\S]*?-->/g;

export const INT_REGEX = /^[0-9]+$/g;
export const FLOAT_REGEX = /^[0-9]*\.[0-9]+$/g;
export const STRING_DELIMTERS_REGEX = /\"|\'/g;
export const CLOSING_TAG_REGEX = /\/?\s*>$/g;
export const SELF_CLOSING_TAG_REGEX = /\s*\/>$/;

export const SPACES_REGEX = /\s+/g;

export const ATTRIBUTE_NAME_VALIDATOR_REGEX = /^[a-zA-Z_][\w.-:]*$/;
export const TAG_NAME_VALIDATOR_REGEX = /^[a-zA-Z_][\w.-]*$/
export const INVALID_SYMBOLS_REGEX = /[<>&]/g;
export const INVALID_TAG_NAME_SYMBOLS_REGEX = /[<>]/g;

export const specialCharsRegexMap: Record<keyof typeof specialCharsMap, RegExp> = {
    "&": /&amp;/g,
    '"': /&quot;/g,
    "'": /&apos;/g,
    "<": /&lt;/g,
    ">": /&gt;/g,
    "(": /&#40;/g,
    ")": /&#41;/g,
    "#": /&#35;/g,
    " ": /&#32;/g,
    "%": /&#37;/g,
    "+": /&#43;/g,
    "-": /&#45;/g,
    ".": /&#46;/g,
    "/": /&#47;/g,
    ":": /&#58;/g,
    ";": /&#59;/g,
    "=": /&#61;/g,
    "?": /&#63;/g,
    "@": /&#64;/g,
    "[": /&#91;/g,
    "]": /&#93;/g,
    "_": /&#95;/g,
    "`": /&#96;/g,
    "{": /&#123;/g,
    "|": /&#124;/g,
    "}": /&#125;/g,
    "~": /&#126;/g,
    "^": /&#94;/g,
    "\\": /&#92;/g,
    "$": /&#36;/g,
    "!": /&#33;/g,
    "*": /&#42;/g,
    ",": /&#44;/g,
    "\n": /&#10;/g,
    "\r": /&#13;/g,
    "\t": /&#9;/g,
    "©": /&#169;/g,
    "®": /&#174;/g,
    "¢": /&#162;/g,
    "£": /&#163;/g,
    "¥": /&#165;/g,
    "€": /&#8364;/g,
    "§": /&#167;/g,
    "•": /&#8226;/g,
    "°": /&#176;/g,
    "¶": /&#182;/g,
    "∞": /&#8734;/g,
    "÷": /&#247;/g,
    "×": /&#215;/g,
    "±": /&#177;/g,
    "²": /&#178;/g,
    "³": /&#179;/g,
    "¼": /&#188;/g,
    "½": /&#189;/g,
    "¾": /&#190;/g
} as const;