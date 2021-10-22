const bcrypt = require("bcryptjs")
const { createToken } = require("../utils")

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

  const token = createToken({ userId: user.id })

  return { token, user }
}

async function login(_, { email, password }, { prisma }) {
  // cerco l'utente nel DB mediante la email
  const user = await prisma.user.findUnique({
    where: { email },
  })

  // se non lo trovo => errore
  if (!user) {
    throw new Error("No such user found")
  }

  // se lo trovo, controllo con bcrypt se gli hash
  // delle password coincidono
  const isValid = await bcrypt.compare(password, user.password)

  // se non coincidono => errore
  if (!isValid) {
    throw new Error("Invalid password")
  }

  // se coincidono, rilascio un jwt
  const token = createToken({ userId: user.id })

  // ritorno l'AuthPayload
  return { token, user }
}

module.exports = {
  post,
  signup,
  login,
}
