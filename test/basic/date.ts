import test from 'ava';
import { init, testSequence } from '../util';

const startingPoint = 1550000000000;

function makeOffsetGetter(instance, method) {
    return () => {
        const saved = Date.prototype.getTime;
        Date.prototype.getTime = () => startingPoint;
        const result = instance[method];
        Date.prototype.getTime = saved;

        if (!(result instanceof Date)) {
            return 'not a date instance';
        }

        return result.getTime() - startingPoint;
    };
}

function testDate(method, values) {
    test(method, t => {
        const instance = init();

        testSequence(t, makeOffsetGetter(instance, method), values);
        t.pass();
    });
}

testDate('date', [31468760301, -29429273181, 4043301073]);
testDate('dateFuture', [13160214417, 31468760301, 22731713103]);
testDate('datePast', [-13160214417, -31468760301, -22731713103]);
