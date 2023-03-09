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
    t.falsy(PhonyData.prototype.hasOwnProperty('xxx'));
    t.falsy(PhonyData.prototype.hasOwnProperty('_xxx'));
    define('xxx', 1);
    t.truthy(PhonyData.prototype.hasOwnProperty('xxx'));
    t.truthy(PhonyData.prototype.hasOwnProperty('_xxx'));
    delete PhonyData.prototype.xxx;
    delete PhonyData.prototype._xxx;
    t.pass();
});

test('defineForObject adds two properties to an object', t => {
    const obj = {};
    defineForObject(obj, 'xxx', 1);
    t.truthy(obj.hasOwnProperty('xxx'));
    t.truthy(obj.hasOwnProperty('_xxx'));
    t.is(obj.xxx, 1);
    t.is(typeof obj._xxx, 'function');
    t.is(obj._xxx(), 1);
    t.pass();
});

test('defineObject sets multiple properties', t => {
    t.falsy(PhonyData.prototype.hasOwnProperty('xxx'));
    t.falsy(PhonyData.prototype.hasOwnProperty('_xxx'));
    t.falsy(PhonyData.prototype.hasOwnProperty('yyy'));
    t.falsy(PhonyData.prototype.hasOwnProperty('_yyy'));
    defineObject({
        xxx: 1,
        yyy: 2
    });
    t.truthy(PhonyData.prototype.hasOwnProperty('xxx'));
    t.truthy(PhonyData.prototype.hasOwnProperty('_xxx'));
    t.truthy(PhonyData.prototype.hasOwnProperty('yyy'));
    t.truthy(PhonyData.prototype.hasOwnProperty('_yyy'));
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
