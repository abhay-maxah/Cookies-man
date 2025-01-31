/*
  Warnings:

  - Added the required column `ProductId` to the `cookies` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `images` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `cookies` DROP FOREIGN KEY `cookies_id_fkey`;

-- AlterTable
ALTER TABLE `cookies` ADD COLUMN `ProductId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `images` MODIFY `image` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `cookies` ADD CONSTRAINT `cookies_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
