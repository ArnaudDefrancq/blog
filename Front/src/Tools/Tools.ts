export class Tools {
    public static timestampToDate(timestamp: number): string {
        return new Date(timestamp * 1000).toLocaleDateString('fr-FR');
    }
}