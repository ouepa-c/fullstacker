-- DropForeignKey
ALTER TABLE `art_comment` DROP FOREIGN KEY `art_comment_article_id_fkey`;

-- AddForeignKey
ALTER TABLE `art_comment` ADD CONSTRAINT `art_comment_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
