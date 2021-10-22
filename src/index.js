const fs = require("fs")
const path = require("path")
const jwt = require("jsonwebtoken")
const APP_SECRET = "myStrongPassword1234"
const { ApolloServer } = require("apollo-server")
const { PrismaClient } = require("@prisma/client")
const Query = require("./resolvers/Query")
const Mutation = require("./resolvers/Mutation")
const User = require("./resolvers/User")
const Link = require("./resolvers/Link")

const typeDefs = fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8")
const prisma = new PrismaClient()

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query, Mutation, User, Link },
  // when context is a function, it acts as a global middleware
  // in which we can choose which context arguments to pass to the resolvers
  context: ({ req }) => {
    const authHeader = req.headers.authorization
    let userId

    // check if there is an auth token
    const authToken = authHeader?.replace("Bearer ", "")
    if (authToken) {
      // check if the auth token is valid
      // to do so, we verify the jwt and get back the payload
      // jwt.verify throws `JsonWebTokenError: invalid signature` if the token is not valid
      const payload = jwt.verify(authToken, APP_SECRET)

      // if it is valid, we get the userId of the authorized user from the payload
      userId = payload.userId
    }

    // if the token is not valid, userId is undefined
    return { prisma, userId }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`)
})
