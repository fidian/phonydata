import { PhonyData } from '../';

export type PhonyDataGeneratorFunction<T> = (
    this: PhonyData,
    ...args: any[]
) => T;
