import test from 'ava';
import { randomGenerator } from './random-generator';

test('randomGenerator returns a function', t => {
    const result = randomGenerator([]);
    t.is(typeof result, 'function');
});
