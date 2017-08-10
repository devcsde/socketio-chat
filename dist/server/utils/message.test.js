"use strict";

var expect = require("expect");

var _require = require("./message"),
    generateMessage = _require.generateMessage;

describe("generateMessage", function () {
    it("should generate correct message object", function () {
        var from = "Chris";
        var text = "hello";
        var result = generateMessage(from, text);

        expect(result.createdAt).toBeA("number");
        expect(result).toInclude({ from: from, text: text });
    });
});
//# sourceMappingURL=message.test.js.map