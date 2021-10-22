const jwt = require("jsonwebtoken")
const APP_SECRET = "myStrongPassword1234"

function getTokenPayload(authToken) {
  return jwt.verify(authToken, APP_SECRET)
}

function createToken(payload) {
  return jwt.sign(payload, APP_SECRET)
}

function getUserId(req) {
  const authHeader = req.headers.authorization

  // check if there is an auth token
  const authToken = authHeader?.replace("Bearer ", "")
  if (!authToken) {
    return null
  }

  // check if the auth token is valid
  // and get userId from the payload
  const { userId } = getTokenPayload(authToken)

  return userId
}

module.exports = {
  getUserId,
  createToken,
}
