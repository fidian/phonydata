"use strict";

// Placeholders that should get overridden by locale-specific extensions.
module.exports = {
    // Language specific
    alphaNumericLower: "abcdefghijklmnopqrstuvwxyz0123456789".split(""),
    alphaNumericUpper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(""),
    letterLower: "abcdefghijklmnopqrstuvwxyz".split(""),
    letterUpper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    sentence() {
        return this.loremSentence;
    },
    title() {
        return this.loremTitle;
    },
    titleWords(num) {
        return this.loremTitleWords(num);
    },
    word() {
        return this.loremWord;
    },
    words(num) {
        return this.loremWords(num);
    },

    // Country specific
    currencyValue() {
        return this.integer(0, 100) + this.integer(0, 100) / 100;
    }
};
