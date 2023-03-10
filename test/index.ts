import test from 'ava';

import {
    define,
    defineForObject,
    PhonyData,
} from '../src';
import { formatGenerator } from '../src/generator/format-generator';
import { parseGenerator } from '../src/generator/parse-generator';
import { sequenceGenerator } from '../src/generator/sequence-generator';

test('define adds two properties', t => {
    t.falsy(Object.prototype.hasOwnProperty.call(PhonyData.prototype, 'xxx'));
    t.falsy(Object.prototype.hasOwnProperty.call(PhonyData.prototype, '_xxx'));
    define('xxx', 1);
    t.truthy(Object.prototype.hasOwnProperty.call(PhonyData.prototype, 'xxx'));
    t.truthy(Object.prototype.hasOwnProperty.call(PhonyData.prototype, '_xxx'));
    delete (PhonyData.prototype as any).xxx;
    delete (PhonyData.prototype as any)._xxx;
    t.pass();
});

test('defineForObject adds two properties to an object', t => {
    const obj: { [key: string]: any } = {};
    defineForObject(obj, 'xxx', 1);
    t.truthy(Object.prototype.hasOwnProperty.call(obj, 'xxx'));
    t.truthy(Object.prototype.hasOwnProperty.call(obj, '_xxx'));
    t.is(obj.xxx, 1);
    t.is(typeof obj._xxx, 'function');
    t.is(obj._xxx(), 1);
    t.pass();
});

test('formatGenerator returns a function', t => {
    const result = formatGenerator([]);
    t.is(typeof result, 'function');
    t.pass();
});

test('parseGenerator returns a function', t => {
    const result = parseGenerator([]);
    t.is(typeof result, 'function');
    t.pass();
});

test('sequenceGenerator returns a working function', t => {
    const result = sequenceGenerator([1, 'a', true]);
    t.is(typeof result, 'function');
    t.is(result.call({}), 1);
    t.is(result.call({}), 'a');
    t.is(result.call({}), true);
    t.is(result.call({}), 1);
    t.pass();
});
