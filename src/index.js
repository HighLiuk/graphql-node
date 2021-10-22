const fs = require("fs")
const path = require("path")
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
  // another way of defining the context
  // but this way we can also access the request object
  context: ({ req }) => {
    return { ...req, prisma }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`)
})
