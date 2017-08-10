const expect = require("expect");

let {generateMessage} = require("./message");

describe("generateMessage", () => {
    it("should generate correct message object", () => {
        let from = "Chris";
        let text = "hello";
        let result = generateMessage(from, text);

        expect(result.createdAt).toBeA("number");
        expect(result).toInclude({from, text});
    });

});