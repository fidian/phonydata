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
    'SE',
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
    'Hidden',
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
    'Run',
];
interface StateCodeToState {
    [key: string]: string;
}
const stateCodeToState: StateCodeToState = {
    AA: 'AA',
    AE: 'AE',
    AK: 'Alaska',
    AL: 'Alabama',
    AP: 'AP',
    AR: 'Arkansas',
    AS: 'American Samoa',
    AZ: 'Arizona',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DC: 'District of Columbia',
    DE: 'Delaware',
    FL: 'Florida',
    FM: 'Federated States of Micronesia',
    GA: 'Georgia',
    GU: 'Guam',
    HI: 'Hawaii',
    IA: 'Iowa',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    MA: 'Massachusetts',
    MD: 'Maryland',
    ME: 'Maine',
    MH: 'Marshall Islands',
    MI: 'Michigan',
    MN: 'Minnesota',
    MO: 'Missouri',
    MP: 'Northern Mariana Islands',
    MS: 'Mississippi',
    MT: 'Montana',
    NC: 'North Carolina',
    ND: 'North Dakota',
    NE: 'Nebraska',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NV: 'Nevada',
    NY: 'New York',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    PR: 'Puerto Rico',
    PW: 'Palau',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VA: 'Virginia',
    VI: 'Virgin Islands',
    VT: 'Vermont',
    WA: 'Washington',
    WI: 'Wisconsin',
    WV: 'West Virginia',
    WY: 'Wyoming',
};

export class PhonyDataUs extends PhonyData {}

const define = defineForObject.bind(null, PhonyDataUs.prototype);

define('givenNameFemale', givenNamesFemale);
define('givenNameMale', givenNamesMale);
define('locality', function (): PhonyDataLocality {
    const entry =
        cityStatePostCode[this.index(cityStatePostCode.length)].split('|');

    return {
        addressLine1: this.buildingNumber + ' ' + this.streetName,
        city: entry[0],
        stateOrProvince: stateCodeToState[entry[1]],
        stateOrProvinceCode: entry[1],
        postCode: entry[2],
    };
});
define('phoneNumber', function () {
    return this.integer(2, 9).toString(10) + this.format('##-###-####');
});
define('postCode', function () {
    return this.locality.postCode;
});
define('streetName', function () {
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
