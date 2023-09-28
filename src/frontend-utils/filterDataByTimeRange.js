export default function filterDataByTimeRange (data, selectedTimeRange) {
  // Get the current date and time
  const currentDate = new Date();

  // Calculate the date based on the selected time range
  let startDate;

  if (selectedTimeRange === 'pastHour') {
    startDate = new Date(currentDate);
    startDate.setHours(currentDate.getHours() - 1);
  } else if (selectedTimeRange === 'pastDay') {
    startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - 1);
  } else if (selectedTimeRange === 'pastWeek') {
    startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - 7);
  } else if (selectedTimeRange === 'pastMonth') {
    startDate = new Date(currentDate);
    startDate.setMonth(currentDate.getMonth() - 1);
  } else if (selectedTimeRange === 'pastYear') {
    startDate = new Date(currentDate);
    startDate.setFullYear(currentDate.getFullYear() - 1);
  }

  // Filter the data based on the calculated start date
  const filteredData = data.filter((item) => {
    const timestampDate = new Date(item.time);
    return timestampDate >= startDate;
  });
  return filteredData;
};