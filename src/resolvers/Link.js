function postedBy({ id }, _, { prisma }) {
  return prisma.link
    .findUnique({
      where: { id },
    })
    .postedBy()
}

module.exports = {
  postedBy,
}
