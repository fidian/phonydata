"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
function text() {
    __1.define('dateText', function (d) {
        this.dateFormat('YYYY-MM-DD', d);
    });
    __1.define('dateTimeCondensed', function (d) {
        this.dateFormat('YYYYMMDDThhmmssZ', d);
    });
    __1.define('dateTimeOffset', function (d) {
        this.dateFormat('YYYY-MM-DDThh:mm:ss+00:00', d);
    });
    __1.define('dateTimeMinuteZ', function (d) {
        this.dateFormat('YYYY-MM-DDThh:mmZ', d);
    });
    __1.define('dateTimeZ', function (d) {
        this.dateFormat('YYYY-MM-DDThh:mm:ssZ', d);
    });
    __1.define('digit', '0123456789'.split(''));
}
exports.text = text;
