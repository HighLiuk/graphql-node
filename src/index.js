const { ApolloServer } = require("apollo-server")

/**
 * The GraphQL Schema
 */
const typeDefs = `
  type Query {
    info: String!
  }
`

/**
 * The resolvers of the root queries
 */
const resolvers = {
  Query: {
    info: () => "This is the API of a Hackernews Clone",
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`)
})
