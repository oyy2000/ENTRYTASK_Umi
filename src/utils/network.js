import cookie from 'js-cookie'
export const BASE_URL = 'http://0.0.0.0:3090/api/v1'
// const ISSERVER = typeof window === "undefined"
const TEMPO_TOKEN = 'e35a668065b987dbecee97ac2f45eab5'
//Object 转为 String 用于添加GET的参数
export function o2s(obj, arr = [], idx = 0) {
  for (let item in obj) {
    arr[idx++] = [item, obj[item]]
  }
  return new URLSearchParams(arr).toString()
}
export const getCookie = (key, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req)
}
// 从客户端获取cookie
const getCookieFromBrowser = (key) => {
  return cookie.get(key)
}
// 从server端获取cookie
const getCookieFromServer = (key, req) => {
  if (!req.cookies) {
    return undefined
  }
  const rawCookie = req.cookies[key]
  if (!rawCookie) {
    return undefined
  }
  return rawCookie
}
//封装的fetch
export async function _fetch(url, data, method = 'GET', options = {}) {
  //如果是GET请求 将条件转换成参数
  const body = o2s(data)
  let params = {
    method: method
  }
  if (method === 'GET') {
    // 如果是GET请求，拼接url
    url += '?' + body
  } else if (method === 'POST') {
    params.body = body
  } else {
    console.warn('fetch method is not GET or POST')
  }
  //管理options
  if (options.cookie != undefined) {
    params.credentials = 'include'
  }
  if (options.headers != undefined && typeof options.headers == 'object') {
    params.headers = new Headers(options.headers)
  } else {
    params.headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-BLACKCAT-TOKEN': getCookie('USER_TOKEN')
    })
  }
  //发请求， 并且直接返回promise包裹的结果 可以做错误操作
  let res = await fetch(url, params)
  if (res.status != 200) return { error: { msg: 'Auth Failed', status: true } }
  return (await options.dataType) == 'text' ? res.text() : res.json()
}
