"use strict";

module.exports = function (formats) {
    if (Array.isArray(formats)) {
        return () => {
            return this.parse(formats[this.index(formats.length)]);
        };
    }

    return () => {
        return this.parse(formats);
    };
};
