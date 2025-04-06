import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function main() {
    const categories = ["Adsense", "Affiliate","Youtube","Facebook","Instagram","Telegram","WhatsApp", "Amazon", "Blog", "E-commerce","Twitter"];


    for (const name of categories) {
        await prisma.category.upsert({
            where:{name},
            update:{},
            create:{
                name
            },
        });
    }
    console.log("Categories seeded successfully");

    
}

main()
.catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(() => {
    prisma.$disconnect();
})