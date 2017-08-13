"use strict";

var moment = require("moment");

var generateMessage = function generateMessage(from, text) {
    return {
        from: from,
        text: text,
        createdAt: moment().valueOf()
    };
};

var generateLocationMessage = function generateLocationMessage(from, latitude, longitude) {
    return {
        from: from,
        url: "https://www.google.com/maps?q=" + latitude + "," + longitude,
        createdAt: moment().valueOf()
    };
};

module.exports = { generateMessage: generateMessage, generateLocationMessage: generateLocationMessage };
//# sourceMappingURL=message.js.map