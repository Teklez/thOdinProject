const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    console.log(e);
    process.exit(1);
  });
