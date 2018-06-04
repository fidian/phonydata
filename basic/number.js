"use strict";

module.exports = {
    index: function (items) {
        return Math.floor(this.random * (items || 1));
    },
    integer: function (min, max) {
        return Math.floor(this.random * (max - min + 1)) + min;
    },
    stars4: function () {
        return this.integer(0, 40) / 10;
    },
    stars5: function () {
        return this.integer(0, 50) / 10;
    }
};
