export type NodeLiteralValue = string | number | Date;
export type NodeAttributes = Record<string, NodeLiteralValue>;
export type Node = {
    tagname: string, 
    attributes?: NodeAttributes,
    value?: NodeLiteralValue,
    nodes?: Record<string, Node | Node[]>
}

export type NodeValueParser = (value: string) => any;
export type JsonifyXMLParser = "default" | "string" | NodeValueParser;
export type JsonifyXMLBaseOptions = Partial<{
    valueParser: JsonifyXMLParser,
    parseAttributes: boolean,
    output: string,
    sanitize: boolean
}>;
export type JsonifyXMLOptions = JsonifyXMLBaseOptions & ({ xml: string } | { input: string });

export type JsonifyResult = [string, { [x: string]: Node }];