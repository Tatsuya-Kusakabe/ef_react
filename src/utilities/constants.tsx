class BaseActionTypes {
  POST__FETCH_POSTS: 'POST__FETCH_POSTS' = 'POST__FETCH_POSTS';
}

export const ActionTypes = new BaseActionTypes();

export const Host = {
  rails: { dev: 'http://localhost:3000' },
  react: { dev: 'http://localhost:3002' },
};

export const TimeDiff = (datePosted: string): string => {
  const datePostedObj: Date = new Date(datePosted);
  const timestampNow: number = Date.now();
  const timestampPosted: number = Date.parse(datePosted);
  const timeDiff = timestampNow - timestampPosted;

  const unitSecond = 1000;
  const unitMinute = 1000 * 60;
  const unitHour = 1000 * 60 * 60;
  const unitDay = 1000 * 60 * 60 * 24;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (timeDiff < 60 * unitSecond) ? `${Math.floor(timeDiff / unitSecond)}s`
    : (timeDiff < 60 * unitMinute) ? `${Math.floor(timeDiff / unitMinute)}m`
    : (timeDiff < 24 * unitHour) ? `${Math.floor(timeDiff / unitHour)}h`
    : (timeDiff < 7 * unitDay) ? `${Math.floor(timeDiff / unitDay)}d`
    : `${months[datePostedObj.getUTCMonth()]} ${datePostedObj.getUTCMonth()}`;
};
