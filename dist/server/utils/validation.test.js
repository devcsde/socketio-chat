"use strict";

var expect = require("expect");

var _require = require("./validation"),
    isRealString = _require.isRealString;

describe("isRealString", function () {
    it("should reject non string values", function () {
        var result = isRealString(true);
        expect(result).toBe(false);
    });
    it("should reject string with only empty spaces", function () {
        var result = isRealString("     ");
        expect(result).toBe(false);
    });
    it("should allow string with non-space charakter", function () {
        var result = isRealString("   ---hello//-this=---  ");
        expect(result).toBe(true);
    });
});
//# sourceMappingURL=validation.test.js.map