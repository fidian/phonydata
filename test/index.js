import test from 'ava';

import {
    define,
    defineForObject,
    defineObject,
    formatGenerator,
    parseGenerator,
    PhonyData,
    sequenceGenerator
} from '../lib';

test('define adds two properties', t => {
    t.falsy(Object.prototype.hasOwnProperty.call(PhonyData, 'xxx'));
    t.falsy(Object.prototype.hasOwnProperty.call(PhonyData, '_xxx'));
    define('xxx', 1);
    t.truthy(Object.prototype.hasOwnProperty.call(PhonyData, 'xxx'));
    t.truthy(Object.prototype.hasOwnProperty.call(PhonyData, '_xxx'));
    delete PhonyData.prototype.xxx;
    delete PhonyData.prototype._xxx;
    t.pass();
});

test('defineForObject adds two properties to an object', t => {
    const obj = {};
    defineForObject(obj, 'xxx', 1);
    t.truthy(Object.prototype.hasOwnProperty.call(obj, 'xxx'));
    t.truthy(Object.prototype.hasOwnProperty.call(obj, '_xxx'));
    t.is(obj.xxx, 1);
    t.is(typeof obj._xxx, 'function');
    t.is(obj._xxx(), 1);
    t.pass();
});

test('defineObject sets multiple properties', t => {
    t.falsy(Object.prototype.hasOwnProperty.call(PhonyData, 'xxx'));
    t.falsy(Object.prototype.hasOwnProperty.call(PhonyData, '_xxx'));
    t.falsy(Object.prototype.hasOwnProperty.call(PhonyData, 'yyy'));
    t.falsy(Object.prototype.hasOwnProperty.call(PhonyData, '_yyy'));
    defineObject({
        xxx: 1,
        yyy: 2
    });
    t.truthy(Object.prototype.hasOwnProperty.call(PhonyData, 'xxx'));
    t.truthy(Object.prototype.hasOwnProperty.call(PhonyData, '_xxx'));
    t.truthy(Object.prototype.hasOwnProperty.call(PhonyData, 'yyy'));
    t.truthy(Object.prototype.hasOwnProperty.call(PhonyData, '_yyy'));
    delete PhonyData.prototype.xxx;
    delete PhonyData.prototype._xxx;
    delete PhonyData.prototype.yyy;
    delete PhonyData.prototype._yyy;
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
    t.is(result(), 1);
    t.is(result(), 'a');
    t.is(result(), true);
    t.is(result(), 1);
    t.pass();
});
