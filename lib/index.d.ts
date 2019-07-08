export interface PhonyDataDefineObject {
    [key: string]: any;
}
export interface PhonyData {
    define(name: PhonyDataDefineObject): void;
    define(name: string, generator: any): void;
}
export declare class PhonyData implements PhonyData {
    constructor();
}
