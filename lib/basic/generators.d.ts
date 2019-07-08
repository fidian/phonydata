import { PhonyData } from '..';
declare module '..' {
    interface PhonyData {
        formatGenerator: (formats: string[] | string) => (() => string);
        parseGenerator: (formats: string[] | string) => (() => string);
        sequenceGenerator: (values: any[]) => (() => any);
    }
}
export declare function generators(phonyData: PhonyData): void;
