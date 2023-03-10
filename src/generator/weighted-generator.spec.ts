import test from 'ava';
import { weightedGenerator } from './weighted-generator';

test('weightedGenerator returns a working function', t => {
    const result = weightedGenerator([]);
    t.is(typeof result, 'function');
});
