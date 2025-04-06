-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('INSTOCK', 'OUT_OF_STOCK');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'INSTOCK';
