import test from 'ava';
import { parseGenerator } from './parse-generator';

test('parseGenerator returns a function', t => {
    const result = parseGenerator([]);
    t.is(typeof result, 'function');
});
