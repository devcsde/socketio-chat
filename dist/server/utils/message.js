"use strict";

var generateMessage = function generateMessage(from, text) {
    return {
        from: from,
        text: text,
        createdAt: new Date().getTime()
    };
};

module.exports = { generateMessage: generateMessage };
//# sourceMappingURL=message.js.map