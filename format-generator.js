"use strict";

module.exports = function (formats) {
    if (Array.isArray(formats)) {
        return () => {
            return this.format(formats[this.index(formats.length)]);
        };
    }

    return () => {
        return this.format(formats);
    };
};
