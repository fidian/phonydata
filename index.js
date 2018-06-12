"use strict";
var basicBoolean, basicDate, basicFunctions, basicLocale, basicLorem, basicModifiers, basicNumber, basicRandom, basicText, formatGenerator, parseGenerator, sequenceGenerator;

basicBoolean = require("./basic/boolean");
basicDate = require("./basic/date");
basicFunctions = require("./basic/functions");
basicLocale = require("./basic/locale");
basicLorem = require("./basic/lorem");
basicModifiers = require("./basic/modifiers");
basicNumber = require("./basic/number");
basicRandom = require("./basic/random");
basicText = require("./basic/text");
formatGenerator = require("./format-generator");
parseGenerator = require("./parse-generator");
sequenceGenerator = require("./sequence-generator");

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
    var self;

    self = this;

    if (typeof name === "object") {
        Object.keys(name).forEach(function (key) {
            self.define(key, name[key]);
        });

        return;
    }

    if (Array.isArray(generator)) {
        self.define(name, function () {
            return generator[self.index(generator.length)];
        });

        return;
    }

    if (typeof generator !== "function") {
        self.define(name, function () {
            return generator;
        });

        return;
    }

    if (generator.length) {
        self[name] = generator.bind(self);
    } else {
        Object.defineProperty(self, name, {
            configurable: true,
            get: generator
        });
    }

    self["_" + name] = generator.bind(self);
};

PhonyData.prototype.formatGenerator = formatGenerator;
PhonyData.prototype.parseGenerator = parseGenerator;
PhonyData.prototype.sequenceGenerator = sequenceGenerator;

module.exports = {
    formatGenerator: formatGenerator,
    parseGenerator: parseGenerator,
    PhonyData: PhonyData
};
