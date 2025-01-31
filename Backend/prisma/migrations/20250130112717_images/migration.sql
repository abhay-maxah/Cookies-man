-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `Images_ImageId_fkey`;

-- DropIndex
DROP INDEX `Images_ImageId_fkey` ON `images`;

-- AlterTable
ALTER TABLE `images` MODIFY `ImageId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_ImageId_fkey` FOREIGN KEY (`ImageId`) REFERENCES `cookies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
