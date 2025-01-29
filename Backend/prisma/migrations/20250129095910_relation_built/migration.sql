/*
  Warnings:

  - You are about to drop the column `ImageId` on the `cookies` table. All the data in the column will be lost.
  - You are about to drop the column `cookies` on the `product` table. All the data in the column will be lost.
  - Added the required column `ImageId` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cookies` DROP COLUMN `ImageId`;

-- AlterTable
ALTER TABLE `images` ADD COLUMN `ImageId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `cookies`;

-- AddForeignKey
ALTER TABLE `cookies` ADD CONSTRAINT `cookies_id_fkey` FOREIGN KEY (`id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cookiesPrice` ADD CONSTRAINT `cookiesPrice_cId_fkey` FOREIGN KEY (`cId`) REFERENCES `cookies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_ImageId_fkey` FOREIGN KEY (`ImageId`) REFERENCES `cookies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
