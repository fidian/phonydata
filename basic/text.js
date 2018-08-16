"use strict";

module.exports = {
    dateText: function (d) {
        return this.dateFormat("YYYY-MM-DD", d);
    },
    dateTimeCondensed: function (d) {
        return this.dateFormat("YYYYMMDDThhmmssZ", d);
    },
    dateTimeOffset: function (d) {
        return this.dateFormat("YYYY-MM-DDThh:mm:ss+00:00", d);
    },
    dateTimeMinuteZ: function (d) {
        return this.dateFormat("YYYY-MM-DDThh:mmZ", d);
    },
    dateTimeZ: function (d) {
        return this.dateFormat("YYYY-MM-DDThh:mm:ssZ", d);
    },
    digit: "0123456789".split(""),
    hexLower: "0123456789abcdef".split(""),
    hexUpper: "0123456789ABCDEF".split(""),
    sentencePunctuation: "..........?!".split(""),
    uuid: function () {
        var variant;

        variant = [
            "8",
            "9",
            "A",
            "B"
        ][this.index(4)];

        return this.format("xxxxxxxx-xxxx-4xxx-") + variant + this.format("xx-xxxxxxxxxxxx");
    }
};
