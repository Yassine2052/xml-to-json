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

export const ATTRIBUTE_NAME_VALIDATOR_REGEX = /^[a-zA-Z_][\w.-]*$/
export const INVALID_SYMBOLS_REGEX = /[<>&]/g;