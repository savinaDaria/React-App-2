const DateFormatType = {
    DATE: 'Date',
    DATE_TIME: 'DateTime'
} as const;

export function formatDateTime(dateTimeString: string, type: typeof DateFormatType[keyof typeof DateFormatType]): string {
    const date = new Date(dateTimeString);
    let options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };
    switch (type) {
        case DateFormatType.DATE:
            options = {
                weekday: 'short',
                day: 'numeric',
                month: 'long'
            };
            break;
        default:
            options = {
                month: 'short',                
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            };
    }

    const formattedDateTime = date.toLocaleString('en-US', options);
    return formattedDateTime;
}

