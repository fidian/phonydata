"use strict";

module.exports = function (formatsArray) {
    return () => {
        return this.parse(formatsArray[this.index(formatsArray.length)]);
    };
};
