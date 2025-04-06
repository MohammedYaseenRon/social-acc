/*
  Warnings:

  - You are about to drop the column `vendorId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_vendorId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "vendorId";
