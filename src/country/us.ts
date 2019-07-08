import { PhonyData } from '..';
import { givenNameFemale } from './us-data/given-name-female';
import { givenNameMale } from './us-data/given-name-male';
import { surnames } from './us-data/surnames';

export class PhonyDataUs extends PhonyData {
    constructor() {
        super();
        this.define(
            'phoneNumber',
            () => this.integer(2, 9).toString(10) + this.format('##-###-####')
        );
        this.define('givenNameFemale', givenNameFemale);
        this.define('givenNameMale', givenNameMale);
        this.define('surname', surnames);
    }
}
