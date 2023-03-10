import test from 'ava';
import { define, defineForObject, PhonyData } from '../src';

test('define adds two properties', t => {
    t.falsy(Object.prototype.hasOwnProperty.call(PhonyData.prototype, 'xxx'));
    t.falsy(Object.prototype.hasOwnProperty.call(PhonyData.prototype, '_xxx'));
    define('xxx', 1);
    t.truthy(Object.prototype.hasOwnProperty.call(PhonyData.prototype, 'xxx'));
    t.truthy(Object.prototype.hasOwnProperty.call(PhonyData.prototype, '_xxx'));
    delete (PhonyData.prototype as any).xxx;
    delete (PhonyData.prototype as any)._xxx;
});

test('defineForObject adds two properties to an object', t => {
    const obj: { [key: string]: any } = {};
    defineForObject(obj, 'xxx', 1);
    t.truthy(Object.prototype.hasOwnProperty.call(obj, 'xxx'));
    t.truthy(Object.prototype.hasOwnProperty.call(obj, '_xxx'));
    t.is(obj.xxx, 1);
    t.is(typeof obj._xxx, 'function');
    t.is(obj._xxx(), 1);
});
