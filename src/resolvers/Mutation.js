function post(parent, args, { prisma }) {
  const { url, description } = args
  return prisma.link.create({
    data: {
      url,
      description,
    },
  })
}

module.exports = {
  post,
}
