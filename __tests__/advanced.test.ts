import { jsonify } from "../src";

const testCases = [
    {
        description: "should return a list of books inside catalog object",
        xml: `
            <?xml version="1.0"?>
            <catalog>
                <book id="bk101">
                    <author>Gambardella, Matthew</author>
                    <title>XML Developer's Guide</title>
                    <genre>Computer</genre>
                    <price>44.95</price>
                    <publish_date>2000-10-01</publish_date>
                    <description>An in-depth look at creating applications with XML.</description>
                </book>
                <book id="bk102">
                    <author>Ralls, Kim</author>
                    <title>Midnight Rain</title>
                    <genre>Fantasy</genre>
                    <price>5.95</price>
                    <publish_date>2000-12-16</publish_date>
                    <description>A former architect battles corporate zombies, an evil sorceress, and her own childhood to become queen of the world.</description>
                </book>
                <book id="bk103">
                    <author>Corets, Eva</author>
                    <title>Maeve Ascendant</title>
                    <genre>Fantasy</genre>
                    <price>5.95</price>
                    <publish_date>2000-11-17</publish_date>
                    <description>After the collapse of a nanotechnology society in England, the young survivors lay the foundation for a new society.</description>
                </book>
            </catalog>`,
        expected: {
            rootName: "catalog",
            "catalog": {
                "tagname": "catalog",
                "nodes": {
                    "book": [
                        {
                            "attributes": {
                                "id": "bk101"
                            },
                            "nodes": {
                                "author": {
                                    "tagname": "author",
                                    "value": "Gambardella, Matthew"
                                },
                                "title": {
                                    "tagname": "title",
                                    "value": "XML Developer's Guide"
                                },
                                "genre": {
                                    "tagname": "genre",
                                    "value": "Computer"
                                },
                                "price": {
                                    "tagname": "price",
                                    "value": "44.95"
                                },
                                "publish_date": {
                                    "tagname": "publish_date",
                                    "value": "2000-10-01"
                                },
                                "description": {
                                    "tagname": "description",
                                    "value": "An in-depth look at creating applications with XML."
                                }
                            },
                            "tagname": "book"
                        },
                        {
                            "attributes": {
                                "id": "bk102"
                            },
                            "nodes": {
                                "author": {
                                    "tagname": "author",
                                    "value": "Ralls, Kim"
                                },
                                "title": {
                                    "tagname": "title",
                                    "value": "Midnight Rain"
                                },
                                "genre": {
                                    "tagname": "genre",
                                    "value": "Fantasy"
                                },
                                "price": {
                                    "tagname": "price",
                                    "value": "5.95"
                                },
                                "publish_date": {
                                    "tagname": "publish_date",
                                    "value": "2000-12-16"
                                },
                                "description": {
                                    "tagname": "description",
                                    "value": "A former architect battles corporate zombies, an evil sorceress, and her own childhood to become queen of the world."
                                }
                            },
                            "tagname": "book"
                        },
                        {
                            "attributes": {
                                "id": "bk103"
                            },
                            "nodes": {
                                "author": {
                                    "tagname": "author",
                                    "value": "Corets, Eva"
                                },
                                "title": {
                                    "tagname": "title",
                                    "value": "Maeve Ascendant"
                                },
                                "genre": {
                                    "tagname": "genre",
                                    "value": "Fantasy"
                                },
                                "price": {
                                    "tagname": "price",
                                    "value": "5.95"
                                },
                                "publish_date": {
                                    "tagname": "publish_date",
                                    "value": "2000-11-17"
                                },
                                "description": {
                                    "tagname": "description",
                                    "value": "After the collapse of a nanotechnology society in England, the young survivors lay the foundation for a new society."
                                }
                            },                            
                            "tagname": "book"
                        }
                    ]
                }
            }           
        }
    },
    {
        description: "should return the corresponding json to with many nested tags",
        xml: `<?xml version="1.0"?>
            <library>
                <section name="Fiction">
                    <shelf number="1">
                        <book id="bk101">
                            <title>The Great Gatsby</title>
                            <author>F. Scott Fitzgerald</author>
                            <published>
                                <year>1925</year>
                                <month>April</month>
                                <day>10</day>
                            </published>
                            <genres>
                                <genre>Novel</genre>
                                <genre>Fiction</genre>
                            </genres>
                            <availability>
                                <status>Available</status>
                                <checkedOutBy/>
                            </availability>
                        </book>
                        <book id="bk102">
                            <title>1984</title>
                            <author>George Orwell</author>
                            <published>
                                <year>1949</year>
                                <month>June</month>
                                <day>8</day>
                            </published>
                            <genres>
                                <genre>Dystopian</genre>
                                <genre>Political Fiction</genre>
                            </genres>
                            <availability>
                                <status>Checked Out</status>
                                <checkedOutBy>
                                    <user id="usr123">
                                        <name>John Doe</name>
                                        <membershipType>Premium</membershipType>
                                    </user>
                                </checkedOutBy>
                            </availability>
                        </book>
                    </shelf>
                    <shelf number="2">
                        <book id="bk103">
                            <title>Brave New World</title>
                            <author>Aldous Huxley</author>
                            <published>
                                <year>1932</year>
                                <month>August</month>
                                <day>30</day>
                            </published>
                            <genres>
                                <genre>Dystopian</genre>
                                <genre>Science Fiction</genre>
                            </genres>
                            <availability>
                                <status>Available</status>
                                <checkedOutBy/>
                            </availability>
                        </book>
                    </shelf>
                </section>
                <section name="Non-Fiction">
                    <shelf number="1">
                        <book id="bk104">
                            <title>Sapiens: A Brief History of Humankind</title>
                            <author>Yuval Noah Harari</author>
                            <published>
                                <year>2011</year>
                                <month>February</month>
                                <day>4</day>
                            </published>
                            <genres>
                                <genre>Non-fiction</genre>
                                <genre>History</genre>
                            </genres>
                            <availability>
                                <status>Available</status>
                                <checkedOutBy/>
                            </availability>
                        </book>
                    </shelf>
                </section>
            </library>`,
        expected: {"rootName":"library","library":{"tagname":"library","nodes":{"section":[{"tagname":"section","attributes":{"name":"Fiction"},"nodes":{"shelf":[{"tagname":"shelf","attributes":{"number":"1"},"nodes":{"book":[{"tagname":"book","attributes":{"id":"bk101"},"nodes":{"title":{"tagname":"title","value":"The Great Gatsby"},"author":{"tagname":"author","value":"F. Scott Fitzgerald"},"published":{"tagname":"published","nodes":{"year":{"tagname":"year","value":"1925"},"month":{"tagname":"month","value":"April"},"day":{"tagname":"day","value":"10"}}},"genres":{"tagname":"genres","nodes":{"genre":[{"tagname":"genre","value":"Novel"},{"tagname":"genre","value":"Fiction"}]}},"availability":{"tagname":"availability","nodes":{"status":{"tagname":"status","value":"Available"},"checkedOutBy":{"tagname":"checkedOutBy"}}}}},{"tagname":"book","attributes":{"id":"bk102"},"nodes":{"title":{"tagname":"title","value":"1984"},"author":{"tagname":"author","value":"George Orwell"},"published":{"tagname":"published","nodes":{"year":{"tagname":"year","value":"1949"},"month":{"tagname":"month","value":"June"},"day":{"tagname":"day","value":"8"}}},"genres":{"tagname":"genres","nodes":{"genre":[{"tagname":"genre","value":"Dystopian"},{"tagname":"genre","value":"Political Fiction"}]}},"availability":{"tagname":"availability","nodes":{"status":{"tagname":"status","value":"Checked Out"},"checkedOutBy":{"tagname":"checkedOutBy","nodes":{"user":{"tagname":"user","attributes":{"id":"usr123"},"nodes":{"name":{"tagname":"name","value":"John Doe"},"membershipType":{"tagname":"membershipType","value":"Premium"}}}}}}}}}]}},{"tagname":"shelf","attributes":{"number":"2"},"nodes":{"book":{"tagname":"book","attributes":{"id":"bk103"},"nodes":{"title":{"tagname":"title","value":"Brave New World"},"author":{"tagname":"author","value":"Aldous Huxley"},"published":{"tagname":"published","nodes":{"year":{"tagname":"year","value":"1932"},"month":{"tagname":"month","value":"August"},"day":{"tagname":"day","value":"30"}}},"genres":{"tagname":"genres","nodes":{"genre":[{"tagname":"genre","value":"Dystopian"},{"tagname":"genre","value":"Science Fiction"}]}},"availability":{"tagname":"availability","nodes":{"status":{"tagname":"status","value":"Available"},"checkedOutBy":{"tagname":"checkedOutBy"}}}}}}}]}},{"tagname":"section","attributes":{"name":"Non-Fiction"},"nodes":{"shelf":{"tagname":"shelf","attributes":{"number":"1"},"nodes":{"book":{"tagname":"book","attributes":{"id":"bk104"},"nodes":{"title":{"tagname":"title","value":"Sapiens: A Brief History of Humankind"},"author":{"tagname":"author","value":"Yuval Noah Harari"},"published":{"tagname":"published","nodes":{"year":{"tagname":"year","value":"2011"},"month":{"tagname":"month","value":"February"},"day":{"tagname":"day","value":"4"}}},"genres":{"tagname":"genres","nodes":{"genre":[{"tagname":"genre","value":"Non-fiction"},{"tagname":"genre","value":"History"}]}},"availability":{"tagname":"availability","nodes":{"status":{"tagname":"status","value":"Available"},"checkedOutBy":{"tagname":"checkedOutBy"}}}}}}}}}]}}}
    }
];

describe("parse advanced xml entities", () => {
    test.each(testCases)('$description', ({ xml, expected }) => {
        const result = jsonify({
            xml,
            valueParser: "string"
        });
        expect(result).toEqual(expected);
    });
});
