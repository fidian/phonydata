// Changes all properties to methods
export interface PhonyDataMethods {
    [key: string]: (...args: any[]) => any;
}
