"use strict";

module.exports = {
    capitalize(str) {
        return str.toString().toUpperCase();
    },
    capitalizeFirst(str) {
        return str.toString().charAt(0).toUpperCase() + str.toString().substr(1);
    },
    capitalizeTitle(str) {
        return str.toString().replace(/(^|[^\w])\w/g, (match) => {
            return match.toUpperCase();
        });
    },
    toJson(thing) {
        return JSON.stringify(thing);
    },
    toString(thing) {
        return thing.toString();
    }
};
