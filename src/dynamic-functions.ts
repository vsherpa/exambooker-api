export const x = (dF: string, dT: string, aD: string | null) => {
  const formatDate = (dateString: string, convertToUTC?: boolean) => {
    let firstChar = dateString.charAt(0);
    // Check if the first character is a number (this happens with user input)
    if (!isNaN(Number(firstChar))) {
      // If it is a number, add a space character in front of it. This is to avoid the below parsing not to break.
      dateString = ' ' + dateString;
    }

    const parts = dateString.split(' ');
    const day = parseInt(parts[1].split('-')[0], 10);
    const month = parseInt(parts[1].split('-')[1], 10); // Months in JavaScript are 0-indexed
    const year = parseInt(parts[1].split('-')[2], 10);
    const timeParts = parts[2].split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const dateTime = new Date(year, month - 1, day, hours, minutes);
    const newDate = new Date(dateTime.getUTCFullYear(), dateTime.getUTCMonth(), dateTime.getUTCDate(), dateTime.getUTCHours(), dateTime.getUTCMinutes(), dateTime.getUTCMinutes());
    return convertToUTC ? newDate : dateTime;
  }

  const evalFormatDate = formatDate.toString();
  const evalFormatDateFunction = new Function('dateString', 'convertToUTC', 'return (' + evalFormatDate + ')(dateString, convertToUTC)');
  console.log('searchDateRange');
  if (aD === null) {
    console.log("actualDate is null. DO nothing******");
    return false
  }
  let isBetweenRange = false;
  const formattedDateRangeToSearchFrom = evalFormatDateFunction(dF);
  const formattedDateRangeToSearchTo = evalFormatDateFunction(dT);
  const formattedActualDate = evalFormatDateFunction(aD);

  if (formattedActualDate.getTime() >= formattedDateRangeToSearchFrom.getTime() && formattedActualDate.getTime() <= formattedDateRangeToSearchTo.getTime()) {
    isBetweenRange = true;
  }
  return isBetweenRange;
};

