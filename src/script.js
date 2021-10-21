const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  // await prisma.link.create({
  //   data: {
  //     description: "Fullstack tutorial for GraphQL",
  //     url: "www.howtographql.com",
  //   },
  // })
  const links = await prisma.link.findMany()
  console.log(links)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
