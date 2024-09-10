import { ATTRIBUTE_NAME_VALIDATOR_REGEX, SELF_CLOSING_TAG_REGEX } from "../constants/regex";

export function closesOpenedTag(currentTag: string, openedTagname: string) {
    const regex = new RegExp(`^</${openedTagname}\\s*>$`, "g");
    return regex.test(currentTag);
}

export function isSelfClosingTag(tag: string) {
    return SELF_CLOSING_TAG_REGEX.test(tag);
}

export function isValidAttributeName(value: string) {
    return ATTRIBUTE_NAME_VALIDATOR_REGEX.test(value);
}