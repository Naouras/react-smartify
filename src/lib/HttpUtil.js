import Config from '../config'


export function getData(url) {
  return fetch(url, {
    credentials: 'include',
    headers: {
      'Authorization': 'Bearer ' + Config.spotifyAccessToken
    }
  })
    .then((req) => {
      if (req.status >= 400) {
        return new Promise((resolve, reject) => {
          req.json().then((json) => {
            return reject(json);
          })
        })
      }
      return req.json()
    })

}

export function postData(url, data, contentType) {
  if (typeof (data) !== 'string') {
    data = JSON.stringify(data)
  }
  contentType = contentType || 'application/json; charset=UTF-8'
  return fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': contentType,
      'Authorization': 'Bearer ' + Config.spotifyAccessToken
    },
    body: data
  })
    .then(req => {
      if (req.status >= 400) {
        return new Promise((resolve, reject) => {
          req.json().then((json) => {
            return reject(json);
          })
        })
      }
      return req.json()
    })
}

export function putData(url, data, contentType) {
  if (typeof (data) !== 'string') {
    data = JSON.stringify(data)
  }
  contentType = contentType || 'application/json; charset=UTF-8'
  return fetch(url, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
      'Authorization': 'Bearer ' + Config.spotifyAccessToken
    },
    body: data
  })
    .then(req => {
      if (req.status >= 400) {
        return new Promise((resolve, reject) => {
          req.json().then((json) => {
            return reject(json);
          })
        })
      }
      return req.json()
    })
}


export function deleteData(url) {
  return fetch(url, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + Config.spotifyAccessToken
    }
  })
    .then((req) => {
      if (req.status >= 400) {
        return new Promise((resolve, reject) => {
          req.json().then((json) => {
            return reject(json);
          })
        })
      }
      return req.json()
    })

}
