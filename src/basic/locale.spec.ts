import test from 'ava';
import { testGeneric } from '../test-util';

testGeneric(test, 'alphaNumericLower', [], ['p', '9']);
testGeneric(test, 'alphaNumericUpper', [], ['P', '9']);
testGeneric(test, 'letterLower', [], ['k', 'z']);
testGeneric(test, 'letterUpper', [], ['K', 'Z']);
testGeneric(
    test,
    'sentence',
    [],
    [
        'Quia velit a consequatur et voluptatum culpa.',
        'Distinctio fuga eum quae.',
    ]
);
testGeneric(test, 'sentencePunctuation', [], ['.', '!']);
testGeneric(
    test,
    'title',
    [],
    ['Voluptatum Quia Velit A Consequatur', 'Voluptatum Culpa Ea Aut']
);
testGeneric(
    test,
    'titleWords',
    [[3], [2]],
    ['Illo Voluptatum Quia', 'Velit A']
);
testGeneric(test, 'word', [], ['illo', 'voluptatum']);
testGeneric(test, 'words', [[3], [2]], ['illo voluptatum quia', 'velit a']);
testGeneric(test, 'addressLine1', [], ['998 Quia Velit', '187 Fuga Eum']);
testGeneric(test, 'buildingNumber', [], [418, 998]);
testGeneric(test, 'city', [], ['A', 'Quae']);
testGeneric(test, 'currencyValue', [], [41.7, 99.72]);
testGeneric(test, 'givenName', [], ['Voluptatum', 'Velit']);
testGeneric(test, 'givenNameFemale', [], ['Illo', 'Voluptatum']);
testGeneric(test, 'givenNameMale', [], ['Illo', 'Voluptatum']);
testGeneric(
    test,
    'locality',
    [],
    [
        {
            addressLine1: '998 Quia Velit',
            city: 'A',
            postCode: 'EK9 FID',
            stateOrProvince: 'Illo',
            stateOrProvinceCode: 'ILL',
        },
        {
            addressLine1: '187 Fuga Eum',
            city: 'Quae',
            postCode: 'O7T 4PL',
            stateOrProvince: 'Fugit',
            stateOrProvinceCode: 'FUG',
        },
    ]
);
testGeneric(test, 'phoneNumber', [], ['597-901-3912', '231-336-3958']);
testGeneric(test, 'personName', [], ['Voluptatum Quia', 'A Consequatur']);
testGeneric(test, 'postCode', [], ['EK9 FID', 'O7T 4PL']);
testGeneric(test, 'stateOrProvince', [], ['Illo', 'Fugit']);
testGeneric(test, 'stateOrProvinceCode', [], ['ILL', 'FUG']);
testGeneric(test, 'streetName', [], ['Illo Voluptatum', 'Quia Velit']);
testGeneric(test, 'surname', [], ['Illo', 'Voluptatum']);
