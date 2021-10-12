import axios from 'axios'
import qs from 'query-string'

export function createUser(payload, token) {
  return axios({
    method: 'POST',
    url: '/users',
    data: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response.data
    })
}

export function getUsers(token, params) {
  return axios({
    method: 'GET',
    url: `/users?${qs.stringify(params)}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data.data)
    .catch((err) => {
      throw err.response.data
    })
}

export function getUser(id, token) {
  return axios({
    method: 'GET',
    url: `/users/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data.data)
    .catch((err) => {
      throw err.response.data
    })
}

export function updateUser(id, payload, token) {
  return axios({
    method: 'PUT',
    url: `/users/${id}`,
    data: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response.data
    })
}

export function deleteUser(id, token) {
  return axios({
    method: 'DELETE',
    url: `/users/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response.data
    })
}
