# jsonify-xml

A lightweight and efficient library for converting XML to JSON. Perfect for developers needing a simple yet powerful solution to transform XML data structures into JSON format with ease. Ideal for web applications, API integrations, and data parsing workflows.

It does not parse the following elements:

- CDATA sections (*)
- Processing instructions
- XML declarations
- Entity declarations
- Comments

## Installation

```shell
npm install jsonify-xml
```

## Usage

```ts
import { jsonify } from "jsonify-xml";
import path from "path";
import customValueParser from "../src/helpers/customValueParser";

// Option 1: Simple XML string
const jsonResult = jsonify(xmlString);

// Option 2: XML String with custom data parser
const options: JsonifyXMLOptions = {
	xml: xmlString,
	valueParser: customValueParser,
	parseAttributes: true
}
const jsonResult = jsonify(options);

// Option 3: XML file
const options: JsonifyXMLOptions = {
	input: path.join(__dirname, "path/to/xml/file"),
	output: path.join(__dirname, "path/to/json/output")
	valueParser: "string"
}
const jsonResult = jsonify(options);
```

### Options

| Option            | Description                                                                                                                                                                  | Type                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `xml`             | XML content as a string. Required if the `input` option is not provided.                                                                                                     | `string`                              |
| `input`           | Path to the XML source file. Required if the `xml` option is not provided.                                                                                                   | `string`                              |
| `output`          | Path to the JSON output file. Optional.                                                                                                                                      | `string`                              |
| `valueParser`     | Specifies how to parse XML tag or attribute values. It can either be `"string"`, which keeps values in their original string format, or a custom function for custom parsing | `"string" \| "default"` or `function` |
| `parseAttributes` | Determines whether to parse attribute values or leave them as strings. Optional.                                                                                             | `boolean`                             |
| `santize`         | Determines whether special XML characters are replaced with their corresponding ASCII values. Defaults to `true`. Optional.                                                  | `boolean`                             |
### Special Characters Sanitization 

The **sanitizing** process handles the following special XML characters:

```js
const specialCharsMap = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;",
    "(": "&#40;",
    ")": "&#41;",
    "#": "&#35;",
    " ": "&#32;",
    "%": "&#37;",
    "+": "&#43;",
    "-": "&#45;",
    ".": "&#46;",
    "/": "&#47;",
    ":": "&#58;",
    ";": "&#59;",
    "=": "&#61;",
    "?": "&#63;",
    "@": "&#64;",
    "[": "&#91;",
    "]": "&#93;",
    "_": "&#95;",
    "`": "&#96;",
    "{": "&#123;",
    "|": "&#124;",
    "}": "&#125;",
    "~": "&#126;",
    "^": "&#94;",
    "\\": "&#92;",
    "$": "&#36;",
    "!": "&#33;",
    "*": "&#42;",
    ",": "&#44;",
    "\n": "&#10;",
    "\r": "&#13;",
    "\t": "&#9;",
    "©": "&#169;",
    "®": "&#174;",
    "¢": "&#162;",
    "£": "&#163;",
    "¥": "&#165;",
    "€": "&#8364;",
    "§": "&#167;",
    "•": "&#8226;",
    "°": "&#176;",
    "¶": "&#182;",
    "∞": "&#8734;",
    "÷": "&#247;",
    "×": "&#215;",
    "±": "&#177;",
    "²": "&#178;",
    "³": "&#179;",
    "¼": "&#188;",
    "½": "&#189;",
    "¾": "&#190;"
};
```

It also handles decimal and hex numbers using:

```js
const decimalNum = /&#([0-9]+);/g;
const hexNum = /&#x([0-9A-Fa-f]+);/g;
```

It also handles numeric references, both **decimal** and **hexadecimal**, using the following regular expressions:

- **Decimal Numeric References**: Matches numeric references like `&#65;` which represent characters by their decimal Unicode value.

```js
const decimalNum = /&#([0-9]+);/g;
```

- **Hexadecimal Numeric References**: Matches numeric references like `&#x41;` which represent characters by their hexadecimal Unicode value.

```js
const hexNum = /&#x([0-9A-Fa-f]+);/g;
```
## Example

### input.xml

```xml
<Order status="active" priority="high" isUrgent="false" itemCount="3">
	<DeliveryPerson>John Doe</DeliveryPerson>
  <IsCanceled>false</IsCanceled>
	<IsDelivered>true</IsDelivered>
	<OrderCode>12345</OrderCode>
	<OrderDate>2024-11-09</OrderDate>
</Order>
```

### index.ts

```ts
import path from "path";
import { jsonify, JsonifyXMLOptions, JsonifyResult, Node } from "../src";
import { docs } from "./docs";

const INPUT = path.join(__dirname, "index.xml");
const OUTPUT = path.join(__dirname, "output.json");

const options: JsonifyXMLOptions = {
    input: INPUT,
    output: OUTPUT,
    valueParser,
    parseAttributes: true,
    sanitize: true
};

const [rootName, jsonResult]: JsonifyResult = jsonify(options);
const order: Node = jsonResult[rootName];

console.log(order.attributes.status, result.tagname, result.value, result.nodes.DeliveryPerson.value);

function valueParser(value: string) {
    // Check if value is a boolean
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
    
    // Check if value is a number
    const num = Number(value);
    if (!isNaN(num)) return num;
    
    // Check if value is a valid date
    const date = Date.parse(value);
    if (!isNaN(date)) return new Date(date);

    // Default case: return the original string
    return value;
}
```
### output.json

```json
[
  "Order",
  {
    "Order": {
      "tagname": "Order",
      "attributes": {
        "status": "active",
        "priority": "high",
        "isUrgent": false,
        "itemCount": 3
      },
      "nodes": {
        "DeliveryPerson": {
          "tagname": "DeliveryPerson",
          "value": "John Doe"
        },
        "IsCanceled": {
          "tagname": "IsCanceled",
          "value": false
        },
        "IsDelivered": {
          "tagname": "IsDelivered",
          "value": true
        },
        "OrderCode": {
          "tagname": "OrderCode",
          "value": 12345
        },
        "OrderDate": {
          "tagname": "OrderDate",
          "value": "2024-11-09T00:00:00.000Z"
        }
      }
    }
  }
]
```