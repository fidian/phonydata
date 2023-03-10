import { ExecutionContext, TestFn } from 'ava';
import { PhonyData } from '../src';
import { PhonyDataMethods } from './datatypes/phony-data-methods';

export function init(ClassName = PhonyData) {
    const instance = new ClassName();
    instance.seed(1);

    return instance;
}

export function testSequence(
    t: ExecutionContext,
    argsLists: any[][],
    getter: (args: any[]) => any,
    values: any[]
) {
    t.truthy(values.length);

    while (values.length) {
        t.deepEqual(getter(argsLists.shift() || []), values.shift());
    }
}

export function testGeneric(
    testFn: TestFn,
    method: keyof PhonyData,
    argsLists: any[][],
    values: any[],
    ClassName = PhonyData
) {
    testFn(method, t => {
        const instance = init(ClassName);
        testSequence(
            t,
            argsLists.slice(),
            args => {
                if (args.length) {
                    return (instance as unknown as PhonyDataMethods)[method](
                        ...args
                    );
                }

                return instance[method];
            },
            values.slice()
        );

        const instance2 = init(ClassName);
        testSequence(
            t,
            argsLists.slice(),
            args => {
                return (instance2 as unknown as PhonyDataMethods)['_' + method](
                    ...args
                );
            },
            values.slice()
        );
    });
}
