export function formatIDR(number) {
  return Number(number)
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function shortDesc(longString) {
  return longString.substring(0, 40)
}

export function formatDate(date) {
  return date.toISOString().slice(0, 10)
}

export function displayDate(date) {
  const inDate = new Date(date)
  return `${inDate.getDate()}/${inDate.getMonth()}/${inDate.getFullYear()}`
}