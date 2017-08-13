"use strict";

var expect = require("expect");

var _require = require("./message"),
    generateMessage = _require.generateMessage,
    generateLocationMessage = _require.generateLocationMessage;

describe("generateMessage", function () {
    it("should generate correct message object", function () {
        var from = "Chris";
        var text = "hello";
        var result = generateMessage(from, text);

        expect(result.createdAt).toBeA("number");
        expect(result).toInclude({ from: from, text: text });
    });
});

describe("generateLocationMessage", function () {
    it("should generate correct location object", function () {
        var latitude = 1;
        var longitude = 2;
        var from = "Chris";
        var url = "https://www.google.com/maps?q=1,2";

        var result = generateLocationMessage(from, latitude, longitude);

        expect(result).toInclude({ from: from, url: url });
        expect(result.createdAt).toBeA("number");
    });
});

// from = Chris
// createdAt = no

// url = https://www.google.com/maps?q=1,2
//# sourceMappingURL=message.test.js.map