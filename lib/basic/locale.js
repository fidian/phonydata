"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Placeholders that should get overridden by locale-specific extensions.
function locale(phonyData) {
    // Language specific
    phonyData.define('alphaNumericLower', 'abcdefghijklmnopqrstuvwxyz0123456789'.split(''));
    phonyData.define('alphaNumericUpper', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(''));
    phonyData.define('letterLower', 'abcdefghijklmnopqrstuvwxyz'.split(''));
    phonyData.define('letterUpper', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
    phonyData.define('phoneNumber', function () {
        return phonyData.integer(2, 9).toString() + phonyData.format('##-###-####');
    });
    phonyData.define('sentence', function () { return phonyData.loremSentence; });
    phonyData.define('sentencePunctuation', '..........?!'.split(''));
    phonyData.define('title', function () { return phonyData.loremTitle; });
    phonyData.define('titleWords', function (num) {
        return phonyData.loremTitleWords(num);
    });
    phonyData.define('word', function () { return phonyData.loremWord; });
    phonyData.define('words', function (num) { return phonyData.loremWords(num); });
    // Country specific
    phonyData.define('currencyValue', function () { return phonyData.integer(0, 10000) / 100; });
}
exports.locale = locale;
