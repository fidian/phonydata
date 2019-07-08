"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function date(phonyData) {
    phonyData.define('date', function () { return phonyData.random < 0.5 ? phonyData.dateFuture : phonyData.datePast; });
    phonyData.define('dateFuture', function () {
        var d = new Date();
        // Add one second to ensure it's in the future
        d.setTime(d.getTime() + phonyData.index(31557600000) + 1000);
        return d;
    });
    phonyData.define('datePast', function () {
        var d = new Date();
        // Remove one second to ensure it's in the past
        d.setTime(d.getTime() - phonyData.index(31557600000) - 1000);
        return d;
    });
}
exports.date = date;
