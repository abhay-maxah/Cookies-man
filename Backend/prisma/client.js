const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Prisma is connected to MySQL!");
  } catch (error) {
    console.error("❌ Prisma connection failed:", error);
  } 
}

testConnection();

module.exports = prisma;

