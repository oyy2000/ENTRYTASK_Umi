import cookie from 'js-cookie';
export const BASE_URL = 'http://0.0.0.0:3090/api/v1';

export const getCookie = (key, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

const getCookieFromBrowser = (key) => {
  console.log(key, ' Broses');
  return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
  if (!req.cookies) {
    return undefined;
  }
  const rawCookie = req.cookies[key];
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie;
};
// const ISSERVER = typeof window === "undefined"
const TEMPO_TOKEN = 'e35a668065b987dbecee97ac2f45eab5';
export async function _fetch(url, data, method = 'GET', options = {}) {
  console.log(url, data, (method = 'GET'), options);
  const body = o2s(data);
  let params = {
    method: method,
  };
  if (method === 'GET') {
    // 如果是GET请求，拼接url
    url += '?' + body;
  } else {
    params.body = body;
  }
  if (options.cookie != undefined) {
    params.credentials = 'include';
  }
  if (options.headers != undefined && typeof options.headers == 'object') {
    params.headers = new Headers(options.headers);
  } else {
    params.headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'X-BLACKCAT-TOKEN': TEMPO_TOKEN,
      'X-BLACKCAT-TOKEN': getCookie('USER_TOKEN'),
    });
  }
  let res = await fetch(url, params);
  return (await options.dataType) == 'text' ? res.text() : res.json();
}
export function o2s(obj, arr = [], idx = 0) {
  for (let item in obj) {
    arr[idx++] = [item, obj[item]];
  }
  return new URLSearchParams(arr).toString();
}

export async function postSignUp({ username, password, email, avatar }) {
  let url = 'http://0.0.0.0:3090/api/v1/join';
  let requestStruct = { username, password, email, avatar };
  fetch(url, {
    method: 'POST', // or 'PUT'
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestStruct),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export function postLogin({ username, password }) {
  let url = 'http://0.0.0.0:3090/api/v1/auth/token';
  let requestStruct = { username, password };
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestStruct),
  })
    .then((response) => response.json())
    .then((data) => {
      Cookies.set('USER_TOKEN', data.token);
      Cookies.set('USER_INFO', JSON.stringify(data.user));

      // localStorage.setItem("USER_TOKEN", JSON.stringify(data.user))
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export function postLogout() {
  console.log('logout');
  let url = 'http://0.0.0.0:3090/api/v1/auth/token';
  fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export async function getChannels() {
  console.log('channels');
  let url = 'http://0.0.0.0:3090/api/v1/channels';
  let options = {};
  return _fetch(url, options, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'X-BLACKCAT-TOKEN': TEMPO_TOKEN,
      // "X-BLACKCAT-TOKEN": getCookie("USER_TOKEN", req),
      // "X-BLACKCAT-TOKEN": ISSERVER ? "" : localStorage.getItem("Token"),
    },
  });
}

export async function getEvents(options) {
  console.log('events');
  let url = 'http://0.0.0.0:3090/api/v1/events';
  await _fetch(url, options, 'GET', {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'X-BLACKCAT-TOKEN': TEMPO_TOKEN,
      // "X-BLACKCAT-TOKEN": getCookie("USER_TOKEN", req),
      // "X-BLACKCAT-TOKEN": ISSERVER ? "" : localStorage.getItem("Token"),
    },
  });
}
