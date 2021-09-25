export function formatIDR(number) {
  return Number(number)
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function shortDesc(longString) {
  return longString.substring(0, 40)
}