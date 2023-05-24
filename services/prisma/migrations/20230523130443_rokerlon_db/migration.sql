/*
  Warnings:

  - You are about to drop the `cms_comments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cms_comments` DROP FOREIGN KEY `cms_comments_parentId_fkey`;

-- DropForeignKey
ALTER TABLE `cms_comments` DROP FOREIGN KEY `cms_comments_userId_fkey`;

-- DropTable
DROP TABLE `cms_comments`;

-- CreateTable
CREATE TABLE `cmts_comments` (
    `id` INTEGER UNSIGNED NOT NULL,
    `parentId` INTEGER UNSIGNED NOT NULL,
    `userId` INTEGER UNSIGNED NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cmts_comments` ADD CONSTRAINT `cmts_comments_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `art_comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cmts_comments` ADD CONSTRAINT `cmts_comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
