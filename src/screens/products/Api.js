import axios from "axios"
import qs from 'query-string'

export function getProducts(token, params) {
  return axios({
    method: 'GET',
    url: `/products?${qs.stringify(params)}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.data.data
    })
    .catch((err) => {
      throw err
    })
}

export function searchProductByCode(token, code) {
  return axios({
    method: 'GET',
    url: `/products?q=${code}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.data.data?.products[0]
    })
    .catch((err) => {
      throw err.response
    })
}