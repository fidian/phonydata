import { PhonyDataGeneratorFunction } from './phony-data-generator-function';

export type PhonyDataGeneratorValue =
    | PhonyDataGeneratorFunction<any>
    | any[]
    | string
    | number
    | null;
