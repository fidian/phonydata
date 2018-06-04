"use strict";

module.exports = {
    capitalize: function (str) {
        return str.toString().toUpperCase();
    },
    capitalizeFirst: function (str) {
        return str.toString().charAt(0).toUpperCase() + str.toString().substr(1);
    },
    capitalizeTitle: function (str) {
        return str.toString().replace(/(^|[^\w])\w/g, function (match) {
            return match.toUpperCase();
        });
    },
    toJson: function (thing) {
        return JSON.stringify(thing);
    },
    toString: function (thing) {
        return thing.toString();
    }
};
