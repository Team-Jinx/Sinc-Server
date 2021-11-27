/*
  Warnings:

  - Made the column `performanceId` on table `UsersCheeredPerformances` required. This step will fail if there are existing NULL values in that column.
  - Made the column `storyId` on table `UsersCheeredPerformances` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `UsersCheeredPerformances` DROP FOREIGN KEY `UsersCheeredPerformances_performanceId_fkey`;

-- DropForeignKey
ALTER TABLE `UsersCheeredPerformances` DROP FOREIGN KEY `UsersCheeredPerformances_storyId_fkey`;

-- AlterTable
ALTER TABLE `UsersCheeredPerformances` MODIFY `performanceId` VARCHAR(191) NOT NULL,
    MODIFY `storyId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `UsersCheeredPerformances` ADD CONSTRAINT `UsersCheeredPerformances_performanceId_fkey` FOREIGN KEY (`performanceId`) REFERENCES `Performance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersCheeredPerformances` ADD CONSTRAINT `UsersCheeredPerformances_storyId_fkey` FOREIGN KEY (`storyId`) REFERENCES `Story`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
