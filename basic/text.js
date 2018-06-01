"use strict";

module.exports = {
    dateText(d) {
        return this.dateFormat("YYYY-MM-DD", d);
    },
    dateTimeCondensed(d) {
        return this.dateFormat("YYYYMMDDThhmmssZ", d);
    },
    dateTimeOffset(d) {
        return this.dateFormat("YYYY-MM-DDThh:mm:ss+00:00", d);
    },
    dateTimeMinuteZ(d) {
        return this.dateFormat("YYYY-MM-DDThh:mmZ", d);
    },
    dateTimeZ(d) {
        return this.dateFormat("YYYY-MM-DDThh:mm:ssZ", d);
    },
    digit: "0123456789".split(""),
    hexLower: "0123456789abcdef".split(""),
    hexUpper: "0123456789ABCDEF".split(""),
    sentencePunctuation: "..........?!".split("")
};
