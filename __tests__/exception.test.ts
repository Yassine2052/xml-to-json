import { jsonify } from "../src";
import JsonifyError from "../src/models/error";

const testCases = [
    {
        description: "should throw an exception for using mismatched delimiters for the same attribute value",
        xml: `
          <?xml version="1.0"?>
          <catalog>
              <book id='test=adazsq" rank="19" budget="56.5498" createdAt="2000-12-16" approved="true" />
          </catalog>`
    },
    {
        description: "should throw an exception for using invalid delimiters (non-quotes) for an attribute value",
        xml: `
          <?xml version="1.0"?>
          <catalog>
              <book id={test=adazsq} rank="19" budget="56.5498" createdAt="2000-12-16" approved="true" />
          </catalog>`
    },
    {
        description: "should throw an exception for using the value delimiter inside the attribute value",
        xml: `
          <?xml version="1.0"?>
          <catalog>
              <book id="test=adazsq"" rank="19" budget="56.5498" createdAt="2000-12-16" approved="true" />
          </catalog>`
    },
    {
        description: "should throw an exception for using an unaccepted symbol inside the attribute value",
        xml: `
          <?xml version="1.0"?>
          <catalog>
              <book id="test=ada&zsq" rank="19" budget="56.5498" createdAt="2000-12-16" approved="true" />
          </catalog>`
    },
    {
        description: "should throw an exception for using an invalid attribute name (starting with a digit)",
        xml: `
          <?xml version="1.0"?>
          <catalog>
              <book 9id="test=adazsq" rank="19" budget="56.5498" createdAt="2000-12-16" approved="true" />
          </catalog>`
    },
    {
        description: "should throw an exception for using an invalid tag name (starting with a digit)",
        xml: `
          <?xml version="1.0"?>
          <catalog>
              <9book id="test=adazsq" rank="19" budget="56.5498" createdAt="2000-12-16" approved="true" />
          </catalog>`
    },
    {
        description: "should throw an exception for using a '<' inside the tag",
        xml: `
          <?xml version="1.0"?>
          <catalog>
              <book id="test=adazsq" rank="19" budget="56.5498" createdAt="2000-12-16" approved="true<" />
          </catalog>`
    },
    {
        description: "should throw an exception for using a '<' inside the tag",
        xml: `
          <?xml version="1.0"?>
          <catalog>
              <book id="test=adazsq" rank="19" budget="56.5498" createdAt="2000-12-16" approved="true<">hell<</book>
          </catalog>`
    }
];

describe("parse invalid XML entities", () => {
    test.each(testCases)('$description', ({ xml }) => {
        expect(() => jsonify(xml)).toThrow(JsonifyError);
    });
});
