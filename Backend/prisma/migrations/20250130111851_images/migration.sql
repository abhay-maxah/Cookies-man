/*
  Warnings:

  - You are about to drop the column `Type` on the `cookies` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `cookies` table. All the data in the column will be lost.
  - You are about to drop the column `Chocolates` on the `product` table. All the data in the column will be lost.
  - Added the required column `CookiesType` to the `cookies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ProductType` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cookies` DROP COLUMN `Type`,
    DROP COLUMN `description`,
    ADD COLUMN `CookiesType` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `images` ADD COLUMN `fileName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `Chocolates`,
    ADD COLUMN `ProductType` ENUM('CHOCOLATE', 'COOKIE', 'DESSERTS') NOT NULL;
