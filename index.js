"use strict";
const basicBoolean = require("./basic/boolean"),
    basicDate = require("./basic/date"),
    basicFunctions = require("./basic/functions"),
    basicLocale = require("./basic/locale"),
    basicLorem = require("./basic/lorem"),
    basicModifiers = require("./basic/modifiers"),
    basicNumber = require("./basic/number"),
    basicRandom = require("./basic/random"),
    basicText = require("./basic/text"),
    formatGenerator = require("./format-generator"),
    parseGenerator = require("./parse-generator");

/**
 * Data generation class
 */
function PhonyData() {
    this.define(basicBoolean);
    this.define(basicDate);
    this.define(basicFunctions);
    this.define(basicLocale);
    this.define(basicLorem);
    this.define(basicModifiers);
    this.define(basicNumber);
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

PhonyData.prototype.formatGenerator = formatGenerator;
PhonyData.prototype.parseGenerator = parseGenerator;

module.exports = {
    formatGenerator,
    parseGenerator,
    PhonyData
};
