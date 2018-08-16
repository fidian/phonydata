"use strict";
var binary, boolean, date, formatGenerator, functions, locale, lorem, modifiers, number, parseGenerator, random, sequenceGenerator, text, web;

binary = require("./basic/binary");
boolean = require("./basic/boolean");
date = require("./basic/date");
functions = require("./basic/functions");
locale = require("./basic/locale");
lorem = require("./basic/lorem");
modifiers = require("./basic/modifiers");
number = require("./basic/number");
random = require("./basic/random");
text = require("./basic/text");
web = require("./basic/web");
formatGenerator = require("./format-generator");
parseGenerator = require("./parse-generator");
sequenceGenerator = require("./sequence-generator");

/**
 * Data generation class
 */
function PhonyData() {
    this.define(binary);
    this.define(boolean);
    this.define(date);
    this.define(functions);
    this.define(locale);
    this.define(lorem);
    this.define(modifiers);
    this.define(number);
    this.define(random);
    this.define(text);
    this.define(web);
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
