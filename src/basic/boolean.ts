import { define } from '..';

export interface PhonyDataAddBoolean {
    boolean: boolean;
    _boolean(): boolean;
}

export function boolean() {
    define('boolean', function () {
        return this.random < 0.5;
    });
}
