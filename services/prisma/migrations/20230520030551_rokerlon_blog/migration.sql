-- DropForeignKey
ALTER TABLE `article` DROP FOREIGN KEY `article_userId_fkey`;

-- AlterTable
ALTER TABLE `article` MODIFY `userId` INTEGER UNSIGNED NULL;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
