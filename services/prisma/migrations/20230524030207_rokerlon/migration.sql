/*
  Warnings:

  - You are about to drop the column `userId` on the `cmts_comments` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `cmts_comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cmts_comments` DROP FOREIGN KEY `cmts_comments_userId_fkey`;

-- AlterTable
ALTER TABLE `cmts_comments` DROP COLUMN `userId`,
    ADD COLUMN `user_id` INTEGER UNSIGNED NOT NULL;

-- AddForeignKey
ALTER TABLE `cmts_comments` ADD CONSTRAINT `cmts_comments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
