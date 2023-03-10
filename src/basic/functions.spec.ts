import test from 'ava';
import { testGeneric } from '../test-util';

testGeneric(
    test,
    'dateFormat',
    [['YYYY-MM-DDThh:mm:ssZ', new Date(31468760301)]],
    ['1970-12-31T05:19:20Z']
);
testGeneric(test, 'format', [['AaXxZz#']], ['KzBeAe3']);
testGeneric(test, 'parse', [['{{letterLower}} {{digit}}']], ['k 9']);
