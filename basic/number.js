"use strict";

module.exports = {
    index(items) {
        return Math.floor(this.random * (items || 1));
    },
    integer(min, max) {
        return Math.floor(this.random * (max - min + 1)) + min;
    }
};
