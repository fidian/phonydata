"use strict";
const basicFunctions = require("./basic/functions"),
    basicLocale = require("./basic/locale"),
    basicLorem = require("./basic/lorem"),
    basicModifiers = require("./basic/modifiers"),
    basicNumber = require("./basic/number"),
    basicOther = require("./basic/other"),
    basicRandom = require("./basic/random"),
    basicText = require("./basic/text"),
    parseGenerator = require("./parse-generator");

/**
 * Data generation class
 */
function PhonyData() {
    this.define(basicFunctions);
    this.define(basicLocale);
    this.define(basicLorem);
    this.define(basicModifiers);
    this.define(basicNumber);
    this.define(basicOther);
    this.define(basicRandom);
    this.define(basicText);
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

PhonyData.prototype.parseGenerator = parseGenerator;

module.exports = {
    PhonyData
};
