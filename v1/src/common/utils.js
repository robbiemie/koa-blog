
const getCookieExpire = () => {
  const d = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  return d.toGMTString()
}
module.exports = {
  getCookieExpire
}
