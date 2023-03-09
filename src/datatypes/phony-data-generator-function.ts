import { PhonyData } from './phony-data';

export type PhonyDataGeneratorFunction<T> = (
    this: PhonyData,
    ...args: any[]
) => T;
