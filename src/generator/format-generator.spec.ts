import test from 'ava';
import { formatGenerator } from './format-generator';

test('formatGenerator returns a function', t => {
    const result = formatGenerator([]);
    t.is(typeof result, 'function');
});
