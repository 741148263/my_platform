function setCookie(key, value, expires) {
  let data = new Date()
  data.setDate(data.getDate() + expires)
  document.cookie = key + '=' + value + ';expires' + data
}

function delCookie(key) {
  setCookie(key, null, -1)
}


export {
  setCookie,
  delCookie
}
