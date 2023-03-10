import test from 'ava';
import { testGeneric } from '../test-util';

testGeneric(
    test,
    'currency',
    [],
    [
        {
            code: 'ISK',
            countries: ['Iceland'],
            digitalCode: '352',
            name: 'Iceland Krona',
            symbol: 'Kr',
        },
        {
            code: 'ZWL',
            countries: ['Zimbabwe'],
            digitalCode: '932',
            name: 'Zimbabwe Dollar',
            symbol: '$',
        },
    ]
);
testGeneric(test, 'currencyCode', [], ['ISK', 'ZWL']);
testGeneric(test, 'currencyDigitalCode', [], ['352', '932']);
testGeneric(test, 'currencyName', [], ['Iceland Krona', 'Zimbabwe Dollar']);
testGeneric(test, 'currencySymbol', [], ['Kr', '$']);
