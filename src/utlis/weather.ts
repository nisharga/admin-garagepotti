export const getWeatherCondition = (weatherCode: number): string => {
    const weatherConditions: Record<number, string> = {
        0: 'Clear',
        1: 'Clear',
        2: 'Partly Cloudy',
        3: 'Cloudy',
        45: 'Foggy',
        48: 'Foggy',
        51: 'Drizzle',
        53: 'Drizzle',
        55: 'Drizzle',
        56: 'Freezing Drizzle',
        57: 'Freezing Drizzle',
        61: 'Rainy',
        63: 'Rainy',
        65: 'Rainy',
        66: 'Freezing Rain',
        67: 'Freezing Rain',
        71: 'Snowy',
        73: 'Snowy',
        75: 'Snowy',
        77: 'Snowy',
        80: 'Rainy',
        81: 'Rainy',
        82: 'Rainy',
        85: 'Snow Showers',
        86: 'Heavy Snow Showers',
        95: 'Stormy',
        96: 'Stormy',
        99: 'Stormy'
    };

    return weatherConditions[weatherCode] || 'Unknown';
};
