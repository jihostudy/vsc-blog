export const convertTimestamp = (timestamp: Date) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${year}. ${month}. ${day}. ${hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
  return formattedDate;
};
