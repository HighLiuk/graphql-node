const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const APP_SECRET = "myStrongPassword1234"

function post(_, { url, description }, { prisma }) {
  return prisma.link.create({
    data: {
      url,
      description,
    },
  })
}

async function signup(_, { email, password, name }, { prisma }) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return { token, user }
}

module.exports = {
  post,
  signup,
}
