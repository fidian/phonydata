"use strict";

module.exports = {
    index(items) {
        return Math.floor(this.random * (items || 1));
    },
    integer(min, max) {
        return Math.floor(this.random * (max - min + 1)) + min;
    },
    stars4() {
        return this.integer(0, 40) / 10;
    },
    stars5() {
        return this.integer(0, 50) / 10;
    }
};
