const DateFormatter = () => {
    const zeroPadding = nr => {
        return nr > 9 ? nr : "0" + nr;
    }
    const FullDate = date => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${zeroPadding(year)}-${zeroPadding(month)}-${zeroPadding(day)} ${zeroPadding(hours)}:${zeroPadding(minutes)}`;
    }
    return {
        FullDate
    }
}

export default DateFormatter;