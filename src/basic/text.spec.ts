import test from 'ava';
import { testGeneric } from '../test-util';

const date = new Date(31468760301);

testGeneric(test, 'dateText', [[date]], ['1970-12-31']);
testGeneric(test, 'dateTimeCondensed', [[date]], ['19701231T051920Z']);
testGeneric(test, 'dateTimeMinuteZ', [[date]], ['1970-12-31T05:19Z']);
testGeneric(test, 'dateTimeOffset', [[date]], ['1970-12-31T05:19:20+00:00']);
testGeneric(test, 'dateTimeZ', [[date]], ['1970-12-31T05:19:20Z']);
testGeneric(test, 'digit', [], ['4', '9']);
