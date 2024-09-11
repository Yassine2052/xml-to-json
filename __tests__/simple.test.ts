import { jsonify } from "../src";

const testCases: Array<{description: string, xml: string, expected: any, parser: "string" | "default", sanitize?: boolean, parseAttributes?: boolean}> = [
  {
    description: "should parse a entity simple XML",
    xml: `
      <Order>
        <DeliveryPerson>John Doe</DeliveryPerson>
        <IsCanceled>false</IsCanceled>
        <IsDelivered>true</IsDelivered>
        <OrderCode>12345</OrderCode>
      </Order>`,
    expected: {
      rootName: "Order",
      Order: {
        tagname: "Order",
        nodes: {
          DeliveryPerson: { tagname: "DeliveryPerson", value: "John Doe" },
          IsCanceled: { tagname: "IsCanceled", value: "false" },
          IsDelivered: { tagname: "IsDelivered", value: "true"},
          OrderCode: { tagname: "OrderCode", value: "12345"}
        }
      }
    },
    parser: "string"
  },
  {
    description: "should parse a entity simple XML",
    xml: `
      <Order>
        <DeliveryPerson>John Doe</DeliveryPerson>
        <IsCanceled>false</IsCanceled>
        <IsDelivered>true</IsDelivered>
        <OrderCode>12345</OrderCode>
      </Order>`,
    expected: {
      rootName: "Order",
      Order: {
        tagname: "Order",
        nodes: {
          DeliveryPerson: { tagname: "DeliveryPerson", value: "John Doe" },
          IsCanceled: { tagname: "IsCanceled", value: false },
          IsDelivered: { tagname: "IsDelivered", value: true },
          OrderCode: { tagname: "OrderCode", value: 12345}
        }
      }
    },
    parser: "default"
  },
  {
    description: "should parse a simple XML entity with attributes",
    xml: `
      <Order status="active" priority="high" isUrgent="false" itemCount="3">
        <DeliveryPerson>John Doe</DeliveryPerson>
        <IsCanceled>false</IsCanceled>
        <IsDelivered>true</IsDelivered>
        <OrderCode>12345</OrderCode>
      </Order>`,
    expected: {
        rootName: "Order",
        Order: {
          tagname: "Order",
          attributes: {
            status: "active",
            priority: "high",
            isUrgent: "false",
            itemCount: "3"
          },
          nodes: {
            DeliveryPerson: { tagname: "DeliveryPerson", value: "John Doe" },
            IsCanceled: { tagname: "IsCanceled", value: "false" },
            IsDelivered: { tagname: "IsDelivered", value: "true" },
            OrderCode: { tagname: "OrderCode", value: "12345"}
          }
        }
    },
    parser: "string"
  },
  {
    description: "should parse a simple XML entity with attributes",
    xml: `
      <Order status="active" priority="high" isUrgent="false" itemCount="3">
        <DeliveryPerson>John Doe</DeliveryPerson>
        <IsCanceled>false</IsCanceled>
        <IsDelivered>true</IsDelivered>
        <OrderCode>12345</OrderCode>
      </Order>`,
    expected: {
        rootName: "Order",
        Order: {
          tagname: "Order",
          attributes: {
            status: "active",
            priority: "high",
            isUrgent: "false",
            itemCount: "3"
          },
          nodes: {
            DeliveryPerson: { tagname: "DeliveryPerson", value: "John Doe" },
            IsCanceled: { tagname: "IsCanceled", value: false },
            IsDelivered: { tagname: "IsDelivered", value: true },
            OrderCode: { tagname: "OrderCode", value: 12345}
          }
        }
    },
    parser: "default"
  },
  {
    description: "should parse a simple XML entity with attributes",
    xml: `
      <Order status="active" priority="high" isUrgent="false" itemCount="3">
        <DeliveryPerson>John Doe</DeliveryPerson>
        <IsCanceled>false</IsCanceled>
        <IsDelivered>true</IsDelivered>
        <OrderCode>12345</OrderCode>
      </Order>`,
    expected: {
        rootName: "Order",
        Order: {
          tagname: "Order",
          attributes: {
            status: "active",
            priority: "high",
            isUrgent: false,
            itemCount: 3
          },
          nodes: {
            DeliveryPerson: { tagname: "DeliveryPerson", value: "John Doe" },
            IsCanceled: { tagname: "IsCanceled", value: false },
            IsDelivered: { tagname: "IsDelivered", value: true },
            OrderCode: { tagname: "OrderCode", value: 12345}
          }
        }
    },
    parser: "default",
    parseAttributes: true
  },
  {
    description: "should parse a simple XML entity and sanitize values",
    xml: `
      <Order status="&#40;active&#41;" priority="&#35;high" isUrgent="false" itemCount="&#51;">
        <DeliveryPerson>John&#32;Doe</DeliveryPerson>
        <IsCanceled>false</IsCanceled>
        <IsDelivered>true</IsDelivered>
        <OrderCode>12345</OrderCode>
      </Order>`,
    expected: {
        rootName: "Order",
        Order: {
          tagname: "Order",
          attributes: {
            status: "(active)",
            priority: "#high",
            isUrgent: false,
            itemCount: 3
          },
          nodes: {
            DeliveryPerson: { tagname: "DeliveryPerson", value: "John Doe" },
            IsCanceled: { tagname: "IsCanceled", value: false },
            IsDelivered: { tagname: "IsDelivered", value: true },
            OrderCode: { tagname: "OrderCode", value: 12345}
          }
        }
    },
    parser: "default",
    parseAttributes: true,
    sanitize: true
  }
];

describe("parse simple XML entities", ()=> {
  test.each(testCases)('$description - parser: $parser', ({ xml, expected, parser, sanitize, parseAttributes }) => {
      const result = jsonify({
        xml,
        valueParser: parser,
        parseAttributes,
        sanitize
      });
      expect(result).toEqual(expected);
  });
});