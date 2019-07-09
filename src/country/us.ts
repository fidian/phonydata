import { defineForObject, PhonyData } from '..';
import { PhonyDataLocality } from '../basic/locale';
import { cityStatePostCode } from './us-data/city-state-post-code';
import { givenNamesFemale } from './us-data/given-names-female';
import { givenNamesMale } from './us-data/given-names-male';
import { streetNames } from './us-data/street-names';
import { surnames } from './us-data/surnames';

const streetDirections = [
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
const streetNamePrefixes = [
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
const streetNameSuffixes = [
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
export class PhonyDataUs extends PhonyData {}

const define = defineForObject.bind(null, PhonyDataUs.prototype);

define('addressLine1', function() {
    return this.buildingNumber + ' ' + this.streetName;
});
define('buildingNumber', function() {
    return this.integer(1, 1000);
});
define('city', function() {
    return this.locality.city;
});
define('givenNameFemale', givenNamesFemale);
define('givenNameMale', givenNamesMale);
define('locality', function(): PhonyDataLocality {
    const entry = cityStatePostCode[this.index(cityStatePostCode.length)].split(
        '|'
    );

    return {
        addressLine1: this.addressLine1,
        city: entry[0],
        stateOrProvince: entry[1],
        postCode: entry[2]
    };
});
define('phoneNumber', function() {
    return this.integer(2, 9).toString(10) + this.format('##-###-####');
});
define('postCode', function() {
    return this.locality.postCode;
});
define('stateOrProvince', function() {
    return this.locality.stateOrProvince;
});
define('streetName', function() {
    let result = '';

    if (this.random <= 0.01) {
        result +=
            streetNamePrefixes[this.index(streetNamePrefixes.length)] + ' ';
    }

    result += streetNames[this.index(streetNames.length)];

    if (this.random <= 0.8) {
        result +=
            ' ' + streetNameSuffixes[this.index(streetNameSuffixes.length)];
    }

    if (this.random <= 0.1) {
        result += ' ' + streetDirections[this.index(streetDirections.length)];
    }

    return result;
});
define('surname', surnames);
