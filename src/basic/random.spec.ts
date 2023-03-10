import test from 'ava';
import { init } from '../test-util';

test('random', t => {
    const instance = init();
    const x = instance.random;
    const y = instance.random;
    t.not(x, y);
});
test('seed', t => {
    const instance = init();
    instance.seed(4562);
    const x = instance.random;
    instance.seed(4562);
    const y = instance.random;
    t.is(x, y);
});
