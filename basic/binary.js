"use strict";

module.exports = {
    byteValue: function () {
        return this.index(256);
    },
    byteHex: function () {
        var hex;

        hex = this.index(256).toString(16);

        if (hex.length < 2) {
            return "0" + hex;
        }

        return hex;
    }
};
