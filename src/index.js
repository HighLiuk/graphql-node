const fs = require("fs")
const path = require("path")
const { ApolloServer } = require("apollo-server")

/**
 * Database
 */
let links = [
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
    link: (parent, args) => {
      // get data
      const { id } = args

      // process data
      const [link] = links.filter((link) => link.id === id)

      // return data
      return link
    },
  },
  Mutation: {
    post: (parent, args) => {
      // get data
      const { url, description } = args

      // process data
      const idCount = links.length
      const link = {
        id: `link-${idCount}`,
        url,
        description,
      }
      links.push(link)

      // return data
      return link
    },
    updateLink: (parent, args) => {
      const { id, url, description } = args

      const [link] = links.filter((link) => link.id === id)

      if (link) {
        link.url = url ?? link.url
        link.description = description ?? link.description
      }

      return link
    },
    deleteLink: (parent, args) => {
      const { id } = args

      const [link] = links.filter((link) => link.id === id)
      links = links.filter((link) => link.id !== id)

      return link
    },
  },
}

/**
 * Server Configuration
 */
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`)
})
