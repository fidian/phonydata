"use strict";
const loremWordList = require("../data/lorem-words"),
    parseGenerator = require("../parse-generator");

module.exports = {
    loremSentence: parseGenerator([
        "{{loremSentenceFragment|capitalizeFirst}}{{sentencePunctuation}}",
        "{{loremSentenceFragment|capitalizeFirst}}, {{loremSentenceFragment}}{{sentencePunctuation}}"
    ]),
    loremSentenceFragment: parseGenerator([
        "{{loremWord}} {{loremWord}} {{loremWord}}",
        "{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}",
        "{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}",
        "{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}",
        "{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}"
    ]),
    loremTitle() {
        return this.capitalizeTitle(this.loremWords());
    },
    loremTitleWords(num) {
        return this.capitalizeTitle(this.loremWords(num));
    },
    loremWord: loremWordList,
    loremWords(num) {
        const desired = num || this.integer(3, 8),
            words = [];

        while (words.length < desired) {
            words.push(this.loremWord);
        }

        return words.join(" ");
    }
};
