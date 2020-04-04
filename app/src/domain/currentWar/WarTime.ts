import { Time } from "@src/domain/Time";

export class WarTime {
    public readonly start: Time;
    public readonly end: Time;
    public timeZone: number;
    constructor(startTimeStr: string, endTimeStr: string, timeZone: number) {
        this.start = WarTime.parseByCocApiTimeStr(startTimeStr);
        this.end = WarTime.parseByCocApiTimeStr(endTimeStr);
        this.timeZone = timeZone;
    }
    /**
     * mm月dd日
     */
    startDateStr = () =>
        `${this.start.getMonth() + 1}月${this.start.getDate()}日`;
    /**
     * hh時mm分
     */
    startTimeStr = () =>
        `${this.start.getHours() +
            this.timeZone}時${this.start.getMinutes()}分`;
    /**
     * mm月dd日 hh時mm分
     */
    strtDateTimeStr = () => `${this.startDateStr()} ${this.startTimeStr()}`;

    static parseByCocApiTimeStr = (str: string) =>
        Time.parseDateByRegExpMatchArray(cocApiDateArray(str)!);
}

const cocApiDateRegex = /([0-9]{4})([0-9]{2})([0-9]{2})T([0-9]{2})([0-9]{2})([0-9]{2}).000Z/;
const cocApiDateArray = (str: string) => str.match(cocApiDateRegex);
