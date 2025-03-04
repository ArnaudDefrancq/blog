export class Tools {
    public static dateToTimestamp(): number {
        return Math.floor(Date.now() / 1000);
    }

    public static suppLastCaract(str: string) {
        return str.substring(0, str.length - 1);
    }
}