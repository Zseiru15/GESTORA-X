import { PrismaClient } from './generated/prisma/index.js';
const prisma = new PrismaClient();

async function main() {
  const roles = await prisma.rol.findMany();
  console.log('Roles:', roles);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
