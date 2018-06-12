"use strict";

module.exports = function (values) {
    var index;

    index = 0;

    return function () {
        var value;

        value = values[index];
        index += 1;
        index %= values.length;

        return value;
    };
};
