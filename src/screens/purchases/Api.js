import axios from 'axios'
import qs from 'query-string'


export function getPurchases(token, params) {
  return axios({
    method: 'GET',
    url: `/purchases?${qs.stringify(params)}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data.data)
    .catch((err) => {
      throw err.response.data
    })
}

export function getPurchase(id, token) {
  return axios({
    method: 'GET',
    url: `/purchases/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data.data)
    .catch((err) => {
      throw err.response.data
    })
}
