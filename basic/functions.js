"use strict";

module.exports = {
    format(format) {
        return format.toString()
            .replace(/#/g, this._digit)
            .replace(/A/g, this._letterUpper)
            .replace(/a/g, this._letterLower)
            .replace(/X/g, this._hexUpper)
            .replace(/x/g, this._hexLower)
            .replace(/Z/g, this._alphaNumericUpper)
            .replace(/z/g, this._alphaNumericLower);
    },
    parse(format) {
        return format.toString()
            .replace(/\{\{(.*?)\}\}/g, (match, grab) => {
                const elements = grab.replace(/\s*/g, "").split("|");

                return elements.reduce((acc, item) => {
                    try {
                        return this[`_${item}`](acc);
                    } catch (e) {
                        return e.toString();
                    }
                }, null);
            });
    }
};
