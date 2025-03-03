-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `cart_productId_fkey`;

-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `Images_ImageId_fkey`;

-- DropForeignKey
ALTER TABLE `price` DROP FOREIGN KEY `Price_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_ProductId_fkey`;

-- DropIndex
DROP INDEX `cart_productId_fkey` ON `cart`;

-- DropIndex
DROP INDEX `Images_ImageId_fkey` ON `images`;

-- DropIndex
DROP INDEX `Price_productId_fkey` ON `price`;

-- DropIndex
DROP INDEX `product_ProductId_fkey` ON `product`;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `ProductTypes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Price` ADD CONSTRAINT `Price_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_ImageId_fkey` FOREIGN KEY (`ImageId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
