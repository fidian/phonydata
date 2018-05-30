"use strict";
const loremWords = require("./data/lorem-words"),
    MersenneTwister = require("mersenne-twister");

/**
 * Data generation class
 */
function PhonyData() {
    const generator = new MersenneTwister();

    // Random number generation functions
    // [0,1)
    this.define("random", () => {
        return generator.random();
    });
    this.seed = (seed) => {
        return generator.init_seed(seed || 0);
    };

    // Generic text generation
    this.define("digit", "0123456789".split(""));
    this.define("hexLower", "0123456789abcdef".split(""));
    this.define("hexUpper", "0123456789ABCDEF".split(""));
    this.define("loremSentence", this.parseGenerator([
        "{{loremSentenceFragment|capitalizeFirst}}{{sentencePunctuation}}",
        "{{loremSentenceFragment|capitalizeFirst}}, {{loremSentenceFragment}}{{sentencePunctuation}}"
    ]));
    this.define("loremSentenceFragment", this.parseGenerator([
        "{{loremWord}} {{loremWord}} {{loremWord}}",
        "{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}",
        "{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}",
        "{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}",
        "{{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}} {{loremWord}}"
    ]));
    this.define("loremTitle", () => {
        return this.capitalizeTitle(this.loremWords(this.integer(3, 8)));
    });
    this.define("loremTitleWords", (num) => {
        return this.capitalizeTitle(this.loremWords(num));
    });
    this.define("loremWord", loremWords);
    this.define("loremWords", (num) => {
        const desired = num || this.integer(3, 8),
            words = [];

        while (words.length < desired) {
            words.push(this.loremWord);
        }

        return words.join(" ");
    });
    this.define("sentencePunctuation", "..........?!".split(""));

    // Numeric values
    this.define("index", (items) => {
        return Math.floor(this.random * (items || 1));
    });
    this.define("integer", (min, max) => {
        return Math.floor(this.random * (max - min + 1)) + min;
    });

    // Other values
    this.define("boolean", [
        true,
        false
    ]);

    // Modifiers
    this.define("capitalize", (str) => {
        return str.toString().toUpperCase();
    });
    this.define("capitalizeFirst", (str) => {
        return str.toString().charAt(0).toUpperCase() + str.toString().substr(1);
    });
    this.define("capitalizeTitle", (str) => {
        return str.toString().replace(/(^|[^\w])\w/g, (match) => {
            return match.toUpperCase();
        });
    });

    // Data generation
    this.define("format", (format) => {
        return format.toString()
            .replace(/#/g, this._digit)
            .replace(/A/g, this._letterUpper)
            .replace(/a/g, this._letterLower)
            .replace(/X/g, this._hexUpper)
            .replace(/x/g, this._hexLower)
            .replace(/Z/g, this._alphaNumericUpper)
            .replace(/z/g, this._alphaNumericLower);
    });
    this.define("parse", (format) => {
        return format.toString()
            .replace(/\{\{(.*?)\}\}/g, (match, grab) => {
                const elements = grab.replace(/\s*/g, "").split("|");

                return elements.reduce((acc, item) => {
                    try {
                        return this[`_${item}`](acc);
                    } catch (e) {
                        return e.toString();
                    }
                }, null);
            });
    });

    // Placeholders that should get overridden by locale-specific extensions.
    this.define("alphaNumericLower", "abcdefghijklmnopqrstuvwxyz0123456789".split(""));
    this.define("alphaNumericUpper", "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(""));
    this.define("currencyValue", () => {
        return this.integer(0, 100) + this.integer(0, 100) / 100;
    });
    this.define("letterLower", "abcdefghijklmnopqrstuvwxyz".split(""));
    this.define("letterUpper", "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
    this.define("sentence", this._loremSentence);
    this.define("title", this._loremTitle);
    this.define("titleWords", this._loremTitleWords);
    this.define("word", this._loremWord);
    this.define("words", this._loremWords);
}

PhonyData.prototype.define = function (name, generator) {
    if (typeof name === "object") {
        Object.keys(name).forEach((key) => {
            this.define(key, name[key]);
        });

        return;
    }

    if (Array.isArray(generator)) {
        this.define(name, () => {
            return generator[this.index(generator.length)];
        });

        return;
    }

    if (typeof generator !== "function") {
        this.define(name, () => {
            return generator;
        });

        return;
    }

    if (generator.length) {
        this[name] = generator.bind(this);
    } else {
        Object.defineProperty(this, name, {
            configurable: true,
            get: generator
        });
    }

    this[`_${name}`] = generator.bind(this);
};

PhonyData.prototype.parseGenerator = function (formatsArray) {
    return () => {
        return this.parse(formatsArray[this.index(formatsArray.length)]);
    };
};

module.exports = {
    PhonyData
};
