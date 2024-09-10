export const quotes = ["'", '"'] as readonly string[];
export const invalidCharsMap = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;"
} as const;