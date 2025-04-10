import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();
import * as dotenv from "dotenv";

dotenv.config();


export async function main() {
    const categories = ["Adsense", "Affiliate", "Youtube", "Facebook", "Instagram", "Telegram", "WhatsApp", "Amazon", "Blog", "E-commerce", "Twitter"];


    for (const name of categories) {
        await prisma.category.upsert({
            where: { name },
            update: {},
            create: {
                name
            },
        });
    }
    console.log("Categories seeded successfully");

    // ✅ 2. Seed SuperAdmin
    // ✅ 2. Seed SuperAdmin
    const superadminEmail = "yaseenron070@gmail.com";
    const superadminPassword = process.env.SUPERADMIN_PASSWORD || "supersecurepassword";

    const existingAdmin = await prisma.user.findFirst({
        where: { role: "ADMIN", email: superadminEmail },
    });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(superadminPassword, 10);
        await prisma.user.create({
            data: {
                name: "Super Admin",
                email: superadminEmail,
                password: hashedPassword,
                role: "ADMIN",
            },
        });

        console.log("✅ SuperAdmin created");
    } else {
        console.log("✅ SuperAdmin already exists");
    }

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    })