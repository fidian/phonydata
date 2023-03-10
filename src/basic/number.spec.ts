import test from 'ava';
import { testGeneric } from '../test-util';

testGeneric(test, 'index', [[123], [4512]], [51, 4499]);
testGeneric(
    test,
    'integer',
    [
        [4, 123],
        [-1234, 2],
    ],
    [54, -1]
);
