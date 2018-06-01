"use strict";

const PhonyData = require(".").PhonyData;

/**
 * Function to extend PhonyData class
 *
 * @param {(Array<Object>|Object)} defines
 * @return {Object} new exports
 */
function extend(defines) {
    var newClass;

    newClass = function ExtendedPhonyClass() {
        PhonyData.call(this);
        [].concat(defines).forEach((singleObject) => {
            this.define(singleObject);
        });
    };
    newClass.prototype = Object.create(PhonyData.prototype);

    return {
        PhonyData: newClass
    };
}

module.exports = extend;
