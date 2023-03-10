import test from 'ava';
import { testGeneric } from '../test-util';

testGeneric(test, 'cssBasicColorName', [], ['lime', 'yellow']);
testGeneric(test, 'cssColorName', [], ['Ivory', 'YellowGreen']);
testGeneric(test, 'fileExtension', [], ['odft', 'movie']);
testGeneric(
    test,
    'mimeType',
    [],
    ['application/vnd.ms-windows.nwprinting.oob', 'video/x-ms-wmx']
);
testGeneric(test, 'rgbHex', [], ['#6fbe02', '#4f2316']);
