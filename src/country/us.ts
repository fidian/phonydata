import { PhonyData } from '..';
import { PhonyDataLocality } from '../basic/locale';
import { cityStatePostCode } from './us-data/city-state-post-code';
import { givenNameFemale } from './us-data/given-name-female';
import { givenNameMale } from './us-data/given-name-male';
import { surnames } from './us-data/surnames';

export class PhonyDataUs extends PhonyData {
    constructor() {
        super();
        this.define('city', () => this.locality.city);
        this.define('locality', (): PhonyDataLocality => {
            const entry = cityStatePostCode[this.index(cityStatePostCode.length)].split('|');

            return {
                city: entry[0],
                stateOrProvince: entry[1],
                postCode: entry[2]
            };
        });
        this.define(
            'phoneNumber',
            () => this.integer(2, 9).toString(10) + this.format('##-###-####')
        );
        this.define('givenNameFemale', givenNameFemale);
        this.define('givenNameMale', givenNameMale);
        this.define('postCode', () => this.locality.postCode);
        this.define('state', () => this.locality.stateOrProvince);
        this.define('surname', surnames);
    }
}
