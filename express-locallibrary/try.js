const {DateTime} = require('luxon');
const formatDate = (stringDate) => {
    // Parse the date
    const date = DateTime.fromJSDate(new Date(stringDate));
    // Format the date
    const formattedDate = date.setLocale('en').toFormat('MMM d, yyyy');

    return formattedDate;
}

const date = formatDate("");
console.log(date);