/*
  Warnings:

  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Artist` ADD COLUMN `description` TEXT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `phone`,
    ADD COLUMN `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';
