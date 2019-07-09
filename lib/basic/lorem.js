"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var lorem_words_1 = require("../data/lorem-words");
function lorem() {
    __1.define('loremSentence', function () {
        if (this.boolean) {
            return (this.capitalizeFirst(this.loremSentenceFragment) +
                this.sentencePunctuation);
        }
        return (this.capitalizeFirst(this.loremSentenceFragment) +
            ', ' +
            this.loremSentenceFragment +
            this.sentencePunctuation);
    });
    __1.define('loremSentenceFragment', function () {
        return this.loremWords(this.integer(3, 7));
    });
    __1.define('loremTitle', function () {
        return this.capitalizeTitle(this.loremWords());
    });
    __1.define('loremTitleWords', function (num) {
        return this.capitalizeTitle(this.loremWords(num));
    });
    __1.define('loremWord', lorem_words_1.loremWords);
    __1.define('loremWords', function (num) {
        var desired = num || this.integer(3, 8);
        var words = [];
        while (words.length < desired) {
            words.push(this.loremWord);
        }
        return words.join(' ');
    });
}
exports.lorem = lorem;
