export const convertDateFormat = (date: string): string => {
  const convertDate = new Date(date);

  const koreaTime = new Date(convertDate.getTime() + 9 * 60 * 60 * 1000);

  const formattedDate = koreaTime.toISOString().split("T")[0];

  return formattedDate;
};

export const getTimeDifference = (givenDateString: string) => {
  const givenDate = new Date(givenDateString).getTime();
  const currentDate = new Date().getTime();

  // 주어진 날짜와 현재 날짜의 차이(밀리초 단위)
  const diffInMilliseconds = currentDate - givenDate;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // 날짜 차이에 따른 문자열 반환
  if (diffInDays > 0) {
    return `${diffInDays}일 전`;
  } else if (diffInHours > 0) {
    return `${diffInHours}시간 전`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}분 전`;
  } else if (diffInSeconds > 0) {
    return `${diffInSeconds}초 전`;
  } else {
    return `방금 전`;
  }
};
