import test from 'ava';
import { PhonyData } from '../src';

export function init() {
    const instance = new PhonyData();
    instance.seed(1);

    return instance;
}

export function testSequence(t, getter, values) {
    t.truthy(values.length);

    while (values.length) {
        t.deepEqual(getter(), values.shift());
    }
}

export function testGenericGetter(testFn, method, values) {
    testFn(method, t => {
        const instance = init();
        testSequence(t, () => instance[method], values.slice());

        const instance2 = init();
        testSequence(t, () => instance2['_' + method](), values.slice());

        t.pass();
    });
}

test('init loaded', t => t.pass());
