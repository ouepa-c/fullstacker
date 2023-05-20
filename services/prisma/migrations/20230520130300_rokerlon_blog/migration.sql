-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `category_userId_fkey`;

-- AlterTable
ALTER TABLE `category` MODIFY `userId` INTEGER UNSIGNED NULL;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `category_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
