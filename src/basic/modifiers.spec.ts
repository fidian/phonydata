import test from 'ava';
import { testGeneric } from '../test-util';

testGeneric(test, 'capitalize', [['abc 123 xyz']], ['ABC 123 XYZ']);
testGeneric(test, 'capitalizeFirst', [['abc 123 xyz']], ['Abc 123 xyz']);
testGeneric(test, 'capitalizeTitle', [['abc 123 xyz']], ['Abc 123 Xyz']);
testGeneric(
    test,
    'toJson',
    [[{ test: true, str: 'abc' }]],
    ['{"test":true,"str":"abc"}']
);
testGeneric(test, 'toString', [[{}]], ['[object Object]']);
