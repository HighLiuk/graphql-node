function info() {
  return "This is the API of a Hackernews Clone"
}

function feed(_, { filter, take, skip, orderBy }, { prisma }) {
  const where = filter
    ? {
        OR: [
          { url: { contains: filter } },
          { description: { contains: filter } },
        ],
      }
    : {}

  const links = prisma.link.findMany({ where, take, skip, orderBy })
  const count = prisma.link.count({ where })

  return { links, count }
}

module.exports = {
  info,
  feed,
}
