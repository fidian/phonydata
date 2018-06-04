"use strict";

const MersenneTwister = require("mersenne-twister");

/**
 * Initializes the random number generator on the new instance.
 *
 * @param {Object} obj
 * @return {Object} Newly defined methods
 */
function init(obj) {
    const generator = new MersenneTwister(),
        methods = {
            random: function () {
                return generator.random();
            },
            seed: function (seed) {
                return generator.init_seed(seed || 0);
            }
        };

    obj.define(methods);

    return methods;
}

module.exports = {
    random: function () {
        return init(this).random();
    },
    seed: function (seed) {
        return init(this).seed(seed);
    }
};
