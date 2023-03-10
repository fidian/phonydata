import test from 'ava';
import { testGeneric } from '../test-util';

testGeneric(test, 'boolean', [], [true, false, false, false, true]);
