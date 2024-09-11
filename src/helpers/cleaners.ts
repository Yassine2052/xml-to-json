import { specialCharsRegexMap } from "../constants/regex";

export function sanitiseAttributeValue(value: string) {
    const entries = Object.entries(specialCharsRegexMap);

    for(let i = 0; i < entries.length; i++) {
        value = value.replace(entries[i][1], entries[i][0]);
    }

    return decodeNumericReferences(value);
}

function decodeNumericReferences(str: string): string {
    str = str.replace(/&#([0-9]+);/g, (_, dec) => String.fromCharCode(dec));
    str = str.replace(/&#x([0-9A-Fa-f]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
    
    return str;
}