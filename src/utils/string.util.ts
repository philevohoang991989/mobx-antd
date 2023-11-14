import jwtDecode from 'jwt-decode';

export const getCookie = (name: string) => {
  const cookieArr = document.cookie.split(';');
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split('=');
    if (name == cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
};

export const getParams = (filter_type: string) => {
  const url = new URL(document.URL);
  const param = url.search;
  const urlParams = new URLSearchParams(param);
  return urlParams.get(filter_type);
};

export const getExpired = (token: string) => {
  type Token = {
    exp: number;
  };
  const now = new Date();
  const expiredTime: Token = jwtDecode(token);
  const time = expiredTime.exp * 1000;
  now.setTime(time);
  return now.toUTCString();
};
