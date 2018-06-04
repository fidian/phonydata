"use strict";

// Placeholders that should get overridden by locale-specific extensions.
module.exports = {
    // Language specific
    alphaNumericLower: "abcdefghijklmnopqrstuvwxyz0123456789".split(""),
    alphaNumericUpper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(""),
    letterLower: "abcdefghijklmnopqrstuvwxyz".split(""),
    letterUpper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    phoneNumber: function () {
        return this.integer(2, 9).toString() + this.format("##-###-####");
    },
    sentence: function () {
        return this.loremSentence;
    },
    title: function () {
        return this.loremTitle;
    },
    titleWords: function (num) {
        return this.loremTitleWords(num);
    },
    word: function () {
        return this.loremWord;
    },
    words: function (num) {
        return this.loremWords(num);
    },

    // Country specific
    currencyValue: function () {
        return this.integer(0, 100) + this.integer(0, 100) / 100;
    }
};
