const fs = require("fs")
const path = require("path")
const { ApolloServer } = require("apollo-server")
const { PrismaClient } = require("@prisma/client")

/**
 * The resolvers of the root queries
 */
const resolvers = {
  Query: {
    info: () => "This is the API of a Hackernews Clone",
    feed: (parent, args, { prisma }) => {
      return prisma.link.findMany()
    },
  },
  Mutation: {
    post: (parent, args, { prisma }) => {
      const { url, description } = args
      return prisma.link.create({
        data: {
          url,
          description,
        },
      })
    },
  },
}

/**
 * Server Configuration
 */
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: {
    prisma: new PrismaClient(),
  },
})

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`)
})
