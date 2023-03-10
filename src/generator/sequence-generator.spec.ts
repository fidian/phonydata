import test from 'ava';
import { init } from '../test-util';
import { sequenceGenerator } from './sequence-generator';

test('sequenceGenerator returns a working function', t => {
    const result = sequenceGenerator([1, 'a', true]);
    const instance = init();
    t.is(typeof result, 'function');
    t.is(result.call(instance), 1);
    t.is(result.call(instance), 'a');
    t.is(result.call(instance), true);
    t.is(result.call(instance), 1);
});
