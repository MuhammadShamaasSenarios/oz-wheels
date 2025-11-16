import { prisma } from "../src/lib/prisma";
const bcrypt = require("bcrypt");

async function main() {
  const password = await bcrypt.hash("password123", 10);

  await prisma.user.createMany({
    data: [
      {
        email: "test1@example.com",
        password,
      },
      {
        email: "test2@example.com",
        password,
      },
      {
        email: "admin@example.com",
        password,
      },
    ],
    skipDuplicates: true,
  });

  console.log("🌱 Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
