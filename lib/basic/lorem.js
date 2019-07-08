"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lorem_words_1 = require("../data/lorem-words");
function lorem(phonyData) {
    phonyData.define('loremSentence', phonyData.parseGenerator([
        '{{loremSentenceFragment|capitalizeFirst}}{{sentencePunctuation}}',
        '{{loremSentenceFragment|capitalizeFirst}}, {{loremSentenceFragment}}{{sentencePunctuation}}'
    ]));
    phonyData.define('loremSentenceFragment', phonyData.parseGenerator([
        '{{loremWord}} {{loremWord}} {{loremWord}}',
        '{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}',
        '{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}',
        '{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}',
        '{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}'
    ]));
    phonyData.define('loremTitle', function () {
        return phonyData.capitalizeTitle(phonyData.loremWords());
    });
    phonyData.define('loremTitleWords', function (num) {
        return phonyData.capitalizeTitle(phonyData.loremWords(num));
    });
    phonyData.define('loremWord', lorem_words_1.loremWords);
    phonyData.define('loremWords', function (num) {
        var desired = num || phonyData.integer(3, 8);
        var words = [];
        while (words.length < desired) {
            words.push(phonyData.loremWord);
        }
        return words.join(' ');
    });
}
exports.lorem = lorem;
