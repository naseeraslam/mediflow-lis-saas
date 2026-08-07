const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

async function test() {
  const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
  const prisma = new PrismaClient({ adapter });
  
  const orgs = await prisma.organization.findMany();
  console.log("SUCCESS! Orgs count:", orgs.length);
}

test().catch(err => console.error("TEST ERROR:", err));
