"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var city_state_post_code_1 = require("./us-data/city-state-post-code");
var given_name_female_1 = require("./us-data/given-name-female");
var given_name_male_1 = require("./us-data/given-name-male");
var surnames_1 = require("./us-data/surnames");
var PhonyDataUs = /** @class */ (function (_super) {
    __extends(PhonyDataUs, _super);
    function PhonyDataUs() {
        var _this = _super.call(this) || this;
        _this.define('city', function () { return _this.locality.city; });
        _this.define('locality', function () {
            var entry = city_state_post_code_1.cityStatePostCode[_this.index(city_state_post_code_1.cityStatePostCode.length)].split('|');
            return {
                city: entry[0],
                stateOrProvince: entry[1],
                postCode: entry[2]
            };
        });
        _this.define('phoneNumber', function () { return _this.integer(2, 9).toString(10) + _this.format('##-###-####'); });
        _this.define('givenNameFemale', given_name_female_1.givenNameFemale);
        _this.define('givenNameMale', given_name_male_1.givenNameMale);
        _this.define('postCode', function () { return _this.locality.postCode; });
        _this.define('state', function () { return _this.locality.stateOrProvince; });
        _this.define('surname', surnames_1.surnames);
        return _this;
    }
    return PhonyDataUs;
}(__1.PhonyData));
exports.PhonyDataUs = PhonyDataUs;
