"use strict";

module.exports = {
    dateFormat: function (format, date) {
        if (!(date instanceof Date)) {
            date = this.date;
        }

        // Forbidden (used in ISO 8601): W, T, Z
        return format.toString()
            .replace(/YYYY/, date.getUTCFullYear())
            .replace(/MM/, ("0" + (date.getUTCMonth() + 1)).substr(-2))
            .replace(/DD/, ("0" + date.getUTCDate()).substr(-2))
            .replace(/hh/, ("0" + date.getUTCHours()).substr(-2))
            .replace(/mm/, ("0" + date.getUTCMinutes()).substr(-2))
            .replace(/ss/, ("0" + date.getUTCSeconds()).substr(-2));
    },
    format: function (format) {
        return format.toString()
            .replace(/#/g, this._digit)
            .replace(/A/g, this._letterUpper)
            .replace(/a/g, this._letterLower)
            .replace(/X/g, this._hexUpper)
            .replace(/x/g, this._hexLower)
            .replace(/Z/g, this._alphaNumericUpper)
            .replace(/z/g, this._alphaNumericLower);
    },
    parse: function (format) {
        var self;

        self = this;

        return format.toString()
            .replace(/\{\{(.*?)\}\}/g, function (match, grab) {
                const elements = grab.replace(/\s*/g, "").split("|");

                return elements.reduce(function (acc, item) {
                    try {
                        return self["_" + item](acc);
                    } catch (e) {
                        return e.toString();
                    }
                }, null);
            });
    }
};
