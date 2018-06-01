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
            random: () => {
                return generator.random();
            },
            seed: (seed) => {
                return generator.init_seed(seed || 0);
            }
        };

    obj.define(methods);

    return methods;
}

module.exports = {
    random() {
        return init(this).random();
    },
    seed(seed) {
        return init(this).seed(seed);
    }
};
