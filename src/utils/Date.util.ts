export default class DateConverter {
    public convertHourToMin(dureeMinutes: string) {
        const heures = Math.floor(dureeMinutes / 60);
        const minutes = dureeMinutes % 60;
        return `${heures} heures et ${minutes} minutes`;
    }
}
