import { PhonyData } from '..';

declare module '..' {
    interface PhonyData {
        date: Date;
        _date: () => Date;
        dateFuture: Date;
        _dateFuture: () => Date;
        datePast: Date;
        _datePast: () => Date;
    }
}

export function date(phonyData: PhonyData) {
    phonyData.define('date', () => phonyData.random < 0.5 ? phonyData.dateFuture : phonyData.datePast);
    phonyData.define('dateFuture', () => {
        const d = new Date();

        // Add one second to ensure it's in the future
        d.setTime(d.getTime() + phonyData.index(31557600000) + 1000);

        return d;
    });
    phonyData.define('datePast', () => {
        const d = new Date();

        // Remove one second to ensure it's in the past
        d.setTime(d.getTime() - phonyData.index(31557600000) - 1000);

        return d;
    });
}
