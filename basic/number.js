"use strict";

module.exports = {
    index: function (items) {
        return Math.floor(this.random * (items || 1));
    },
    integer: function (min, max) {
        return Math.floor(this.random * (max - min + 1)) + min;
    }
};
