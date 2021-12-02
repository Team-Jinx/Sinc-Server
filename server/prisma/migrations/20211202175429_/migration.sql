/*
  Warnings:

  - You are about to drop the column `backgroundUrl` on the `Story` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Story` DROP COLUMN `backgroundUrl`,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `videoUrl` VARCHAR(191) NULL;
