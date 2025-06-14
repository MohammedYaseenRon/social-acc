import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();
import * as dotenv from "dotenv";

dotenv.config();


export async function main() {

    const mainCategories = [
        "Digital Products", "Clothing & Accessories", "Electronics"
    ];
    const maincat: {[key:string]: number} = {}
    
    for (const name of mainCategories) {
        const cat = await prisma.category.upsert({
            where: { name },
            update: {},
            create: {
                name, parentId: null
            },
        });
        maincat[name] = cat.id; 
    }

    const subcategories = [
        // Digital Products
        { name: "E-books", parentName: "Digital Products" },
        { name: "Software", parentName: "Digital Products" },
        { name: "Music", parentName: "Digital Products" },

        // Clothing & Accessories
        { name: "T-Shirts", parentName: "Clothing & Accessories" },
        { name: "Jackets", parentName: "Clothing & Accessories" },
        { name: "Shoes", parentName: "Clothing & Accessories" },

        // Electronics
        { name: "Headphones", parentName: "Electronics" },
        { name: "Chargers", parentName: "Electronics" },
        { name: "Mobile Accessories", parentName: "Electronics" },
    ];

    for (const sub of subcategories) {
        const parentId = maincat[sub.parentName];
        if (!parentId) {
            console.warn(`⚠️ Parent category not found for ${sub.name}`);
            continue;
        }

        await prisma.category.upsert({
            where: {
                name: sub.name
            },
            update: {},
            create: {
                name: sub.name,
                parentId,
            }
        })
    }

    console.log("Categories and subcategories seeded successfully");

    //  2. Seed SuperAdmin
    //  2. Seed SuperAdmin
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

        console.log(" SuperAdmin created");
    } else {
        console.log(" SuperAdmin already exists");
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