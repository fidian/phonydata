"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mersenne_twister_1 = __importDefault(require("mersenne-twister"));
var lorem_words_1 = require("./data/lorem-words");
var PhonyData = /** @class */ (function () {
    function PhonyData() {
        var _this = this;
        var generator = new mersenne_twister_1.default();
        /******
         * Random number generation functions
         ******/
        // [0,1)
        this.define('random', function () {
            return generator.random();
        });
        this.seed = function (seed) {
            generator.init_seed(seed || 0);
        };
        /******
         * Generic text generation
         ******/
        this.define('digit', '0123456789'.split(''));
        this.define('hexLower', '0123456789abcdef'.split(''));
        this.define('hexUpper', '0123456789ABCDEF'.split(''));
        this.define('loremSentence', this.parseGenerator([
            '{{loremSentenceFragment|capitalizeFirst}}{{sentencePunctuation}}',
            '{{loremSentenceFragment|capitalizeFirst}}, {{loremSentenceFragment}}{{sentencePunctuation}}',
        ]));
        this.define('loremSentenceFragment', this.parseGenerator([
            '{{loremWord}} {{loremWord}} {{loremWord}}',
            '{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}',
            '{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}',
            '{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}',
            '{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}',
        ]));
        this.define('loremTitle', function () { return _this.capitalizeTitle(_this.loremWords(_this.integer(3, 8))); });
        this.define('loremTitleWords', function (num) { return _this.capitalizeTitle(_this.loremWords(num)); });
        this.define('loremWord', lorem_words_1.loremWords);
        this.define('loremWords', function (num) {
            var desired = num || _this.integer(3, 8);
            var words = [];
            while (words.length < desired) {
                words.push(_this.loremWord);
            }
            return words.join(' ');
        });
        this.define('sentencePunctuation', '..........?!'.split(''));
        /******
         * Numeric values
         ******/
        this.define('index', function (items) { return Math.floor(_this.random * (items || 1)); });
        this.define('integer', function (min, max) { return Math.floor(_this.random * (max - min + 1)) + min; });
        /******
         * Other values
         ******/
        this.define('boolean', [true, false]);
        /******
         * Modifiers
         ******/
        this.define('capitalize', function (str) { return str.toString().toUpperCase(); });
        this.define('capitalizeFirst', function (str) { return str.toString().charAt(0).toUpperCase() + str.toString().substr(1); });
        this.define('capitalizeTitle', function (str) { return str.toString().replace(/(^|[^\w])\w/g, function (match) { return match.toUpperCase(); }); });
        /******
         * Data generation
         ******/
        this.define('format', function (format) { return format.toString()
            .replace(/#/g, _this._digit)
            .replace(/A/g, _this._letterUpper)
            .replace(/a/g, _this._letterLower)
            .replace(/X/g, _this._hexUpper)
            .replace(/x/g, _this._hexLower)
            .replace(/Z/g, _this._alphaNumericUpper)
            .replace(/z/g, _this._alphaNumericLower); });
        this.define('parse', function (format) { return format.toString()
            .replace(/\{\{(.*?)\}\}/g, function (match, grab) {
            var elements = grab.replace(/\s*/g, '').split('|');
            var val = _this[elements.shift()];
            return elements.reduce(function (acc, item) {
                return _this["_" + item](acc);
            }, val);
        }); });
        /******
         * Placeholders that should get overridden by locale-specific extensions.
         ******/
        this.define('alphaNumericLower', 'abcdefghijklmnopqrstuvwxyz0123456789'.split(''));
        this.define('alphaNumericUpper', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(''));
        this.define('currencyValue', function () { return _this.integer(0, 100) + _this.integer(0, 100) / 100; });
        this.define('letterLower', 'abcdefghijklmnopqrstuvwxyz'.split(''));
        this.define('letterUpper', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
        this.define('sentence', this._loremSentence);
        this.define('title', this._loremTitle);
        this.define('titleWords', this._loremTitleWords);
        this.define('word', this._loremWord);
        this.define('words', this._loremWords);
    }
    PhonyData.prototype.define = function (name, generator) {
        var _this = this;
        if (typeof name === 'object') {
            Object.keys(name).forEach(function (key) {
                _this.define(key, name[key]);
            });
            return;
        }
        if (Array.isArray(generator)) {
            return this.define(name, function () {
                return generator[_this.index(generator.length)];
            });
        }
        if (typeof generator !== 'function') {
            return this.define(name, function () {
                return generator;
            });
        }
        if (generator.length) {
            this[name] = generator.bind(this);
        }
        else {
            Object.defineProperty(this, name, {
                configurable: true,
                get: generator,
            });
        }
        this["_" + name] = generator.bind(this);
    };
    PhonyData.prototype.parseGenerator = function (formatsArray) {
        var _this = this;
        return function () { return _this.parse(formatsArray[_this.index(formatsArray.length)]); };
    };
    return PhonyData;
}());
exports.PhonyData = PhonyData;
//# sourceMappingURL=index.js.map