export const calDiffDates = (startDate, endDate) => {
    // Calculate the time difference in milliseconds
    const timeDiff = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());

    // Convert milliseconds to days
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}