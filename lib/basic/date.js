"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var oneYearInMs = 31557600000;
var oneSecondInMs = 1000;
function date() {
    __1.define('date', function () {
        if (this.random < 0.5) {
            return this.dateFuture;
        }
        return this.datePast;
    });
    __1.define('dateFuture', function () {
        var d = new Date();
        // Add one second to ensure it's in the future
        d.setTime(d.getTime() + this.index(oneYearInMs) + oneSecondInMs);
        return d;
    });
    __1.define('datePast', function () {
        var d = new Date();
        // Remove one second to ensure it's in the past
        d.setTime(d.getTime() - this.index(oneYearInMs) - oneSecondInMs);
        return d;
    });
}
exports.date = date;
