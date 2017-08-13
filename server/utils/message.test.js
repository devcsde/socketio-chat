const expect = require("expect");

let {generateMessage, generateLocationMessage} = require("./message");

describe("generateMessage", () => {
    it("should generate correct message object", () => {
        let from = "Chris";
        let text = "hello";
        let result = generateMessage(from, text);

        expect(result.createdAt).toBeA("number");
        expect(result).toInclude({from, text});
    });

});

describe("generateLocationMessage", () => {
    it("should generate correct location object", () => {
        let latitude = 1;
        let longitude = 2;
        let from = "Chris";
        let url = "https://www.google.com/maps?q=1,2";

        let result = generateLocationMessage(from, latitude, longitude);

        expect(result).toInclude({from, url});
        expect(result.createdAt).toBeA("number");
    });
});

// from = Chris
// createdAt = no

// url = https://www.google.com/maps?q=1,2