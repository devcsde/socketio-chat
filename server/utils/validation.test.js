const expect = require("expect");
const {isRealString} = require("./validation");

describe("isRealString", () => {
    it("should reject non string values", () => {
        let result = isRealString(true);
        expect(result).toBe(false);
    });
    it("should reject string with only empty spaces", () => {
        let result = isRealString("     ");
        expect(result).toBe(false);
    });
    it("should allow string with non-space charakter", () => {
        let result = isRealString("   ---hello//-this=---  ");
        expect(result).toBe(true);
    });
});