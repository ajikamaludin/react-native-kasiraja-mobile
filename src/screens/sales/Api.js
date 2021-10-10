import axios from 'axios'
import qs from 'query-string'

export function createSale(payload, token) {
  return axios({
    method: 'POST',
    url: '/sales',
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
