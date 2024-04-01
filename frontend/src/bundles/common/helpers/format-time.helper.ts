export const formatTime = (date: string) => {
    let dateFormatted = new Date(date);

    dateFormatted.setHours(0);
    dateFormatted.setMinutes(0);
    dateFormatted.setSeconds(0);
    dateFormatted.setMilliseconds(0);

    return dateFormatted.toISOString();
};