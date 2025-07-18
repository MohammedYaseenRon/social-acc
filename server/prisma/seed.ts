import { PrismaClient, ProductStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import productsData from '../data/products.json'

const prisma = new PrismaClient();

dotenv.config();


export async function main() {

    const mainCategories = [
        "Digital Products", "Clothing & Accessories", "Electronics"
    ];
    const maincat: { [key: string]: number } = {}

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
    // 2. SuperAdmin creation block


    // ✅ 3. Vendor users and vendors creation
    const vendorsToSeed = [
        { name: "Apple Store", email: "apple012@gmail.com" },
        { name: "MarkTech", email: "mark01@gmail.com" }
    ];

    for (const { name, email } of vendorsToSeed) {
        let vendorUser = await prisma.user.findFirst({ where: { email } });

        if (!vendorUser) {
            vendorUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: await bcrypt.hash("vendor123", 10),
                    role: "VENDOR",
                },
            });
        }

        const existingVendor = await prisma.vendor.findFirst({ where: { userId: vendorUser.id } });

        if (!existingVendor) {
            await prisma.vendor.create({
                data: {
                    storeName: name,
                    userId: vendorUser.id,
                },
            });
        }
    }


    //Seed products 
    for (const product of productsData) {
        const vendor = await prisma.vendor.findFirst({
            where: {
                user: {
                    email: product.vendorEmail
                }
            },
            include: {
                user: true
            }
        });

        const category = await prisma.category.findFirst({
            where: {
                name: product.category,
                parentId: {
                    not: null
                }
            }
        });

        if (!category || !vendor) {
            console.warn(`⚠️ Skipping product ${product.name}: category or vendor not found`);
            continue;
        }

        await prisma.product.upsert({
            where: { slug: product.slug },
            update: {},
            create: {
                name: product.name,
                price: product.price,
                sku: product.sku,
                stock: product.stock,
                status: product.status as ProductStatus,
                isActive: product.isActive,
                images: product.images,
                categoryId: category.id,
                vendorId: vendor.id,
                slug: product.slug
            }
        });

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