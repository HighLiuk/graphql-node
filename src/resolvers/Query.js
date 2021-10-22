function info() {
  return "This is the API of a Hackernews Clone"
}

function feed(parent, args, { prisma }) {
  return prisma.link.findMany()
}

module.exports = {
  info,
  feed,
}
