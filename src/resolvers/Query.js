function info() {
  return "This is the API of a Hackernews Clone"
}

function feed(_, __, { prisma }) {
  return prisma.link.findMany()
}

module.exports = {
  info,
  feed,
}
