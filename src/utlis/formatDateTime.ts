export const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'pm' : 'am';

    // Convert to 12-hour format
    hours = hours % 12 || 12; // Adjust hours: 0 becomes 12 in 12-hour clock
    return `${hours}:${minutes}${period}`;
};

export const getFormattedDate = () => {
    const now = new Date();

    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    const day = now.getDate();
    const month = months[now.getMonth()];
    const weekday = days[now.getDay()];

    return `${day} ${month}, ${weekday}`;
};
