import test from 'ava';
import { testGeneric } from '../test-util';

testGeneric(test, 'byteHex', [], ['6f', 'be']);
testGeneric(test, 'byteValue', [], [106, 255]);
testGeneric(test, 'hexLower', [], ['6', 'f', 'b']);
testGeneric(test, 'hexUpper', [], ['6', 'F', 'B']);
testGeneric(
    test,
    'uuid',
    [],
    [
        '6fbe024f-2316-4265-Aa6-e8d65a837e30',
        'ae67862f-3ccb-4fc5-A1b-8eded1d0420e',
    ]
);
