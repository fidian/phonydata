import test from 'ava';
import { testGenericGetter } from '../util';

testGenericGetter(test, 'byteHex', ['6f', 'be']);
testGenericGetter(test, 'byteValue', [106, 255]);
testGenericGetter(test, 'hexLower', ['6', 'f', 'b']);
testGenericGetter(test, 'hexUpper', ['6', 'F', 'B']);
testGenericGetter(test, 'uuid', [
    '6fbe024f-2316-4265-Aa6-e8d65a837e30',
    'ae67862f-3ccb-4fc5-A1b-8eded1d0420e'
]);
