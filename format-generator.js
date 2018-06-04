"use strict";

module.exports = function (formats) {
    if (Array.isArray(formats)) {
        return function () {
            return this.format(formats[this.index(formats.length)]);
        };
    }

    return function () {
        return this.format(formats);
    };
};
