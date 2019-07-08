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
var given_names_female_1 = require("./us-data/given-names-female");
var given_names_male_1 = require("./us-data/given-names-male");
var street_names_1 = require("./us-data/street-names");
var surnames_1 = require("./us-data/surnames");
var streetDirections = [
    'N',
    'S',
    'E',
    'W',
    'North',
    'South',
    'East',
    'West',
    'NW',
    'SW',
    'NE',
    'SE'
];
var streetNamePrefixes = [
    'Country',
    'Van',
    'Saint',
    'Blue',
    'White',
    'Valley',
    'Route',
    'Old',
    'St',
    'New',
    'East',
    'Red',
    'Spring',
    'Blue',
    'White',
    'South',
    'Green',
    'West',
    'North',
    'Indian',
    'Valley',
    'Black',
    'Hidden'
];
var streetNameSuffixes = [
    'Drive',
    'Road',
    'Street',
    'Court',
    'Lane',
    'Avenue',
    'Way',
    'Place',
    'Circle',
    'Boulevard',
    'Terrace',
    'Trail',
    'Alley',
    'Cove',
    'Parkway',
    'Run'
];
var PhonyDataUs = /** @class */ (function (_super) {
    __extends(PhonyDataUs, _super);
    function PhonyDataUs() {
        var _this = _super.call(this) || this;
        _this.define('addressLine1', function () { return _this.buildingNumber + ' ' + _this.streetName; });
        _this.define('buildingNumber', function () { return _this.integer(1, 1000); });
        _this.define('city', function () { return _this.locality.city; });
        _this.define('givenNameFemale', given_names_female_1.givenNamesFemale);
        _this.define('givenNameMale', given_names_male_1.givenNamesMale);
        _this.define('locality', function () {
            var entry = city_state_post_code_1.cityStatePostCode[_this.index(city_state_post_code_1.cityStatePostCode.length)].split('|');
            return {
                addressLine1: _this.addressLine1,
                city: entry[0],
                stateOrProvince: entry[1],
                postCode: entry[2]
            };
        });
        _this.define('phoneNumber', function () { return _this.integer(2, 9).toString(10) + _this.format('##-###-####'); });
        _this.define('postCode', function () { return _this.locality.postCode; });
        _this.define('stateOrProvince', function () { return _this.locality.stateOrProvince; });
        _this.define('streetName', function () {
            var result = '';
            if (_this.random <= 0.01) {
                result += streetNamePrefixes[_this.index(streetNamePrefixes.length)] + ' ';
            }
            result += street_names_1.streetNames[_this.index(street_names_1.streetNames.length)];
            if (_this.random <= 0.8) {
                result += ' ' + streetNameSuffixes[_this.index(streetNameSuffixes.length)];
            }
            if (_this.random <= 0.1) {
                result += ' ' + streetDirections[_this.index(streetDirections.length)];
            }
            return result;
        });
        _this.define('surname', surnames_1.surnames);
        return _this;
    }
    return PhonyDataUs;
}(__1.PhonyData));
exports.PhonyDataUs = PhonyDataUs;
