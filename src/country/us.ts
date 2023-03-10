import { defineForObject, PhonyData } from '..';
import { PhonyDataLocality } from '../datatypes/phony-data-locality';
import { PhonyDataGeneratorFunction } from '../datatypes/phony-data-generator-function';
import { givenNamesFemale } from './us-data/given-names-female';
import { givenNamesMale } from './us-data/given-names-male';
import { randomGenerator } from '../generator/random-generator';
import { stateCodeToState } from './us-data/state-code-to-state';
import { streetDirections } from './us-data/street-directions';
import { streetNamePrefixes } from './us-data/street-name-prefixes';
import { streetNames } from './us-data/street-names';
import { streetNameSuffixes } from './us-data/street-name-suffixes';
import { surnames } from './us-data/surnames';
import { stateCityPopulationZips } from './us-data/state-city-population-zips';
import { weightedGenerator } from '../generator/weighted-generator';

interface CityInfo {
    cityName: string;
    population: number;
    generator: PhonyDataGeneratorFunction<string>;
}

const stateToCityInfo = new Map<string, CityInfo[]>();

for (const stateCityPopulationZip of stateCityPopulationZips) {
    const [stateCode, cityName, populationString, ...zips] =
        stateCityPopulationZip.split('|');
    const population = +populationString;

    const cities = stateToCityInfo.get(stateCode) || [];
    cities.push({
        cityName,
        population,
        generator: randomGenerator(zips),
    });
    stateToCityInfo.set(stateCode, cities);
}

const weightedStateCodeData: [number, string][] = [];
const cityGeneratorByState = new Map<
    string,
    PhonyDataGeneratorFunction<string>
>();
const zipGeneratorByStateCity = new Map<
    string,
    Map<string, PhonyDataGeneratorFunction<string>>
>();

for (const [stateCode, cities] of stateToCityInfo) {
    const population = cities.reduce((acc, next) => acc + next.population, 0);
    const cityList: [number, string][] = cities.map(city => [
        city.population,
        city.cityName,
    ]);
    weightedStateCodeData.push([population, stateCode]);
    cityGeneratorByState.set(stateCode, weightedGenerator(cityList));

    const zipGeneratorByCity = new Map<
        string,
        PhonyDataGeneratorFunction<string>
    >();
    zipGeneratorByStateCity.set(stateCode, zipGeneratorByCity);

    for (const city of cities) {
        zipGeneratorByCity.set(city.cityName, city.generator);
    }
}

const weightedStateCodeGenerator = weightedGenerator(weightedStateCodeData);

export class PhonyDataUs extends PhonyData {}

const define = defineForObject.bind(null, PhonyDataUs.prototype);

define('givenNameFemale', givenNamesFemale);
define('givenNameMale', givenNamesMale);
define('locality', function (): PhonyDataLocality {
    const stateCode = weightedStateCodeGenerator.call(this);
    const cityGenerator = cityGeneratorByState.get(stateCode);
    const zipGeneratorByCity = zipGeneratorByStateCity.get(stateCode);
    let cityName = '';
    let zipCode = '';

    if (cityGenerator) {
        cityName = cityGenerator.call(this);
    }

    if (zipGeneratorByCity) {
        const zipGenerator = zipGeneratorByCity.get(cityName);

        if (zipGenerator) {
            zipCode = zipGenerator.call(this);
        }
    }

    return {
        addressLine1: this.buildingNumber + ' ' + this.streetName,
        city: cityName,
        stateOrProvince: stateCodeToState[stateCode],
        stateOrProvinceCode: stateCode,
        postCode: zipCode,
    };
});
define('phoneNumber', function () {
    return this.integer(2, 9).toString(10) + this.format('##-###-####');
});
define('postCode', function () {
    return this.locality.postCode;
});
define('streetName', function () {
    let result = '';

    if (this.random <= 0.01) {
        result +=
            streetNamePrefixes[this.index(streetNamePrefixes.length)] + ' ';
    }

    result += streetNames[this.index(streetNames.length)];

    if (this.random <= 0.8) {
        result +=
            ' ' + streetNameSuffixes[this.index(streetNameSuffixes.length)];
    }

    if (this.random <= 0.1) {
        result += ' ' + streetDirections[this.index(streetDirections.length)];
    }

    return result;
});
define('surname', surnames);
