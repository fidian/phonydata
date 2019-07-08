import { ParentThing } from './parent';
declare module './parent' {
    interface ParentThing {
        add: (a: number, b: number) => number;
    }
}
export declare function child1(prototype: ParentThing): void;
