import { PhonyData } from '..';
import { surnames } from './us-data/surnames';

export class PhonyDataUs extends PhonyData {
    constructor() {
        super();
        this.define(
            'phoneNumber',
            () => this.integer(2, 9).toString(10) + this.format('##-###-####')
        );
        this.define('surname', surnames);
    }
}
