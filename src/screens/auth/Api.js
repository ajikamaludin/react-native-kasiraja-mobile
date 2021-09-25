import axios from 'axios'

export function login(payload) {
  const { email, password } = payload
  return axios({
    method: 'POST',
    url: '/authentications',
    data: { email, password }
  })
    .then(response => response.data)
    .catch(err => {throw err.response.data})
}

export function register(payload) {
  const { name, email, password } = payload
  return axios({
    method: 'POST',
    url: '/registration',
    data: { name, email, password },
  })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response.data
    })
}