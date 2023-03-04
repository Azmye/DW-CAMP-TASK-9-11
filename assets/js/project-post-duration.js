const differenceInDays = (date_1, date_2) => {
  let date1 = new Date(date_1);
  let date2 = new Date(date_2);
  let timeDiff = date2.getTime() - date1.getTime();
  let daysDiff = timeDiff / (1000 * 3600 * 24);

  return daysDiff;
};

const differenceInMonths = (date_1, date_2) => {
  let date1 = new Date(date_1);
  let date2 = new Date(date_2);
  const monthDiff = date2.getMonth() - date1.getMonth();
  const yearDiff = date2.getYear() - date1.getYear();

  return monthDiff + yearDiff * 12;
};

const getDuration = (date1, date2) => {
  let getDiffInMonths = differenceInMonths(date1, date2);
  let getDiffInDays = differenceInDays(date1, date2);

  if (getDiffInMonths <= 0) {
    return getDiffInDays === 1 ? `${getDiffInDays} Day` : `${getDiffInDays} Days`;
  } else {
    return getDiffInMonths === 1 ? `${getDiffInMonths} Month` : `${getDiffInMonths} Months`;
  }
};
