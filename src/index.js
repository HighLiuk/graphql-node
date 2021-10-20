const { ApolloServer } = require("apollo-server")

/**
 * The GraphQL Schema
 */
const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Link {
    id: ID!
    url: String!
    description: String!
  }
`

/**
 * Database
 */
const links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
]

/**
 * The resolvers of the root queries
 */
const resolvers = {
  Query: {
    info: () => "This is the API of a Hackernews Clone",
    feed: () => links,
  },
  Link: {
    // these are actually not required, but that's how these works under the hood
    id: (parent) => parent.id,
    url: (parent) => parent.url,
    description: (parent) => parent.description,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`)
})
