const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const APP_SECRET = "myStrongPassword1234"

// requiring authentication for this mutation.
// here we assume that we have a userId if and only if
// we are recognized as the User with id equal to userId
function post(_, { url, description }, { prisma, userId }) {
  return prisma.link.create({
    data: {
      url,
      description,
      postedBy: { connect: { id: userId } },
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
