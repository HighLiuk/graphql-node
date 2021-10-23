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

  return prisma.link.findMany({ where, take, skip, orderBy })
}

module.exports = {
  info,
  feed,
}
