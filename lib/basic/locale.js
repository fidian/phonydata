"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Placeholders that should get overridden by locale-specific extensions.
function locale(phonyData) {
    // Language specific
    phonyData.define('alphaNumericLower', 'abcdefghijklmnopqrstuvwxyz0123456789'.split(''));
    phonyData.define('alphaNumericUpper', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(''));
    phonyData.define('city', function () { return phonyData.loremTitleWords(1); });
    phonyData.define('givenName', function () {
        return phonyData.random < 0.5
            ? phonyData.givenNameFemale
            : phonyData.givenNameMale;
    });
    phonyData.define('givenNameFemale', function () { return phonyData.loremTitleWords(1); });
    phonyData.define('givenNameMale', function () { return phonyData.loremTitleWords(1); });
    phonyData.define('letterLower', 'abcdefghijklmnopqrstuvwxyz'.split(''));
    phonyData.define('letterUpper', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
    phonyData.define('locality', function () {
        return {
            city: phonyData.city,
            stateOrProvince: phonyData.stateOrProvince,
            postCode: phonyData.postCode
        };
    });
    phonyData.define('personName', function () { return phonyData.givenName + ' ' + phonyData.surname; });
    phonyData.define('phoneNumber', function () {
        return phonyData.integer(2, 9).toString() + phonyData.format('##-###-####');
    });
    phonyData.define('postCode', function () { return phonyData.format('ZZZ ZZZ'); });
    phonyData.define('sentence', function () { return phonyData.loremSentence; });
    phonyData.define('sentencePunctuation', '..........?!'.split(''));
    phonyData.define('stateOrProvince', function () { return phonyData.format('AAA'); });
    phonyData.define('surname', function () { return phonyData.loremTitleWords(1); });
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
