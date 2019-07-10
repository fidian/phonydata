import test from 'ava';
import { testGenericGetter } from '../util';

testGenericGetter(test, 'currency', [
    {
        code: 'ISK',
        countries: ['Iceland'],
        digitalCode: '352',
        name: 'Iceland Krona',
        symbol: 'Kr'
    },
    {
        code: 'ZWL',
        countries: ['Zimbabwe'],
        digitalCode: '932',
        name: 'Zimbabwe Dollar',
        symbol: '$'
    }
]);
testGenericGetter(test, 'currencyCode', ['ISK', 'ZWL']);
testGenericGetter(test, 'currencyDigitalCode', ['352', '932']);
testGenericGetter(test, 'currencyName', ['Iceland Krona', 'Zimbabwe Dollar']);
testGenericGetter(test, 'currencySymbol', ['Kr', '$']);
