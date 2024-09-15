import { ATTRIBUTE_NAME_VALIDATOR_REGEX, SELF_CLOSING_TAG_REGEX, TAG_NAME_VALIDATOR_REGEX } from "../constants/regex";

export function closesOpenedTag(currentTag: string, openedTagname: string) {
    const regex = new RegExp(`^</${openedTagname}\\s*>$`, "g");
    return regex.test(currentTag);
}

export function isSelfClosingTag(tag: string) {
    return SELF_CLOSING_TAG_REGEX.test(tag);
}

export function isValidAttributeNameWithNamespace(attName: string) {
    const attWithNamespace = attName.split(":");

    if(attWithNamespace.length > 2) {
        return false;
    }

    return attName;
}

export function isValidAttributeName(attName: string) {
    return ATTRIBUTE_NAME_VALIDATOR_REGEX.test(attName);
}

export function isValidTagName(attName: string) {
    return TAG_NAME_VALIDATOR_REGEX.test(attName);
}