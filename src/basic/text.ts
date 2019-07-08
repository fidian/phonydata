import { PhonyData } from '..';

declare module '..' {
    interface PhonyData {
        dateText: (d: Date) => string;
        _dateText: (d: Date) => string;
        dateTimeCondensed: (d: Date) => string;
        _dateTimeCondensed: (d: Date) => string;
        dateTimeOffset: (d: Date) => string;
        _dateTimeOffset: (d: Date) => string;
        dateTimeMinuteZ: (d: Date) => string;
        _dateTimeMinuteZ: (d: Date) => string;
        dateTimeZ: (d: Date) => string;
        _dateTimeZ: (d: Date) => string;
        digit: string;
        _digit: () => string;
    }
}

export function text(phonyData: PhonyData) {
    phonyData.define('dateText', (d: Date) =>
        phonyData.dateFormat('YYYY-MM-DD', d)
    );
    phonyData.define('dateTimeCondensed', (d: Date) =>
        phonyData.dateFormat('YYYYMMDDThhmmssZ', d)
    );
    phonyData.define('dateTimeOffset', (d: Date) =>
        phonyData.dateFormat('YYYY-MM-DDThh:mm:ss+00:00', d)
    );
    phonyData.define('dateTimeMinuteZ', (d: Date) =>
        phonyData.dateFormat('YYYY-MM-DDThh:mmZ', d)
    );
    phonyData.define('dateTimeZ', (d: Date) =>
        phonyData.dateFormat('YYYY-MM-DDThh:mm:ssZ', d)
    );
    phonyData.define('digit', '0123456789'.split(''));
}
