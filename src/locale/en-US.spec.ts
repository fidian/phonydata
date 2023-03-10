import test from 'ava';
import { testGeneric } from '../test-util';
import { PhonyDataEnUs } from './en-US';

testGeneric(test, 'alphaNumericLower', [], ['p', '9'], PhonyDataEnUs);
testGeneric(test, 'alphaNumericUpper', [], ['P', '9'], PhonyDataEnUs);
testGeneric(test, 'letterLower', [], ['k', 'z'], PhonyDataEnUs);
testGeneric(test, 'letterUpper', [], ['K', 'Z'], PhonyDataEnUs);
testGeneric(
    test,
    'sentence',
    [],
    [
        'Quia velit a consequatur et voluptatum culpa.',
        'Distinctio fuga eum quae.',
    ],
    PhonyDataEnUs
);
testGeneric(test, 'sentencePunctuation', [], ['.', '!'], PhonyDataEnUs);
testGeneric(
    test,
    'title',
    [],
    ['Voluptatum Quia Velit A Consequatur', 'Voluptatum Culpa Ea Aut'],
    PhonyDataEnUs
);
testGeneric(
    test,
    'titleWords',
    [[3], [2]],
    ['Illo Voluptatum Quia', 'Velit A'],
    PhonyDataEnUs
);
testGeneric(test, 'word', [], ['illo', 'voluptatum'], PhonyDataEnUs);
testGeneric(
    test,
    'words',
    [[3], [2]],
    ['illo voluptatum quia', 'velit a'],
    PhonyDataEnUs
);
testGeneric(
    test,
    'addressLine1',
    [],
    ['933 Saint Begonia', '187 Englewood Way'],
    PhonyDataEnUs
);
testGeneric(test, 'buildingNumber', [], [418, 998], PhonyDataEnUs);
testGeneric(test, 'city', [], ['Leakey', 'Los Angeles'], PhonyDataEnUs);
testGeneric(test, 'currencyValue', [], [41.7, 99.72], PhonyDataEnUs);
testGeneric(test, 'givenName', [], ['Candra', 'Modesto'], PhonyDataEnUs);
testGeneric(test, 'givenNameFemale', [], ['Lanette', 'Candra'], PhonyDataEnUs);
testGeneric(test, 'givenNameMale', [], ['Jess', 'Dorsey'], PhonyDataEnUs);
testGeneric(
    test,
    'locality',
    [],
    [
        {
            addressLine1: '933 Saint Begonia',
            city: 'Leakey',
            postCode: '78873',
            stateOrProvince: 'Texas',
            stateOrProvinceCode: 'TX',
        },
        {
            addressLine1: '187 Englewood Way',
            city: 'Los Angeles',
            postCode: '90018',
            stateOrProvince: 'California',
            stateOrProvinceCode: 'CA',
        },
    ],
    PhonyDataEnUs
);
testGeneric(
    test,
    'phoneNumber',
    [],
    ['597-901-3912', '231-336-3958'],
    PhonyDataEnUs
);
testGeneric(
    test,
    'personName',
    [],
    ['Candra Piper', 'James Burge'],
    PhonyDataEnUs
);
testGeneric(test, 'postCode', [], ['78873', '90018'], PhonyDataEnUs);
testGeneric(
    test,
    'stateOrProvince',
    [],
    ['Texas', 'California'],
    PhonyDataEnUs
);
testGeneric(test, 'stateOrProvinceCode', [], ['TX', 'CA'], PhonyDataEnUs);
testGeneric(
    test,
    'streetName',
    [],
    ['Mill Parkway NE', 'Street Court SE'],
    PhonyDataEnUs
);
testGeneric(test, 'surname', [], ['Hightower', 'Zellner'], PhonyDataEnUs);
