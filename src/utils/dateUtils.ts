export const convertDateFormat = (date: Date): string => {
  const convertDate = new Date(date);

  const koreaTime = new Date(convertDate.getTime() + 9 * 60 * 60 * 1000);

  const formattedDate = koreaTime.toISOString().split("T")[0];

  return formattedDate;
};
