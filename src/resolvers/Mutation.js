const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const APP_SECRET = "myStrongPassword1234"

function post(parent, args, { prisma }) {
  const { url, description } = args
  return prisma.link.create({
    data: {
      url,
      description,
    },
  })
}

async function signup(parent, args, { prisma }) {
  const { email, password, name } = args

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
