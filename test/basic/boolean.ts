import test from 'ava';
import { testGenericGetter } from '../util';

testGenericGetter(test, 'boolean', [true, false, false, false, true]);
