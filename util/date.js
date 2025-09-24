export function getFormattedDate(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
};

export function getEarliestDate(numOfDays) {
    const today = new Date();
    const range = new Date(today.getFullYear(), today.getMonth(), today.getDate() - numOfDays);
    return range;
};

export function getDateString(date) {
    const dateString = date.toISOString().slice(0, 10);
    return dateString;
};