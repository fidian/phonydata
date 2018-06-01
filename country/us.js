"use strict";

module.exports = {
    phoneNumber() {
        return this.integer(2, 9).toString(10) + this.format("##-###-####");
    }
};
