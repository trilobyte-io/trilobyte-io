export default function formatDate (datetime, timeRange) {
  const jsDateObj = new Date(datetime);

  const formattedDate = jsDateObj.toLocaleTimeString('en-US', {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Use 12-hour clock with AM/PM
  });

  if (timeRange === "pastHour") {
    return formattedDate.toString().slice(5, 13);
  } else if (timeRange === "pastDay") {
    return formattedDate.toString().slice(5, 13);
  } else if (timeRange === "pastWeek") {
    return formattedDate.toString().slice(0, 4);
  } else if (timeRange === "pastMonth") {
    return formattedDate.toString().slice(0, 4);
  } else if (timeRange === "pastYear") {
    return formattedDate.toString().slice(0, 4);
  }
}