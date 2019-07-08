"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function text(phonyData) {
    phonyData.define('dateText', function (d) {
        return phonyData.dateFormat('YYYY-MM-DD', d);
    });
    phonyData.define('dateTimeCondensed', function (d) {
        return phonyData.dateFormat('YYYYMMDDThhmmssZ', d);
    });
    phonyData.define('dateTimeOffset', function (d) {
        return phonyData.dateFormat('YYYY-MM-DDThh:mm:ss+00:00', d);
    });
    phonyData.define('dateTimeMinuteZ', function (d) {
        return phonyData.dateFormat('YYYY-MM-DDThh:mmZ', d);
    });
    phonyData.define('dateTimeZ', function (d) {
        return phonyData.dateFormat('YYYY-MM-DDThh:mm:ssZ', d);
    });
    phonyData.define('digit', '0123456789'.split(''));
}
exports.text = text;
