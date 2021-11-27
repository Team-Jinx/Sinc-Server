/*
  Warnings:

  - You are about to drop the column `reservationTime` on the `UsersBoughtPerformances` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `UsersBoughtPerformances` DROP COLUMN `reservationTime`,
    ADD COLUMN `reservationTimeId` VARCHAR(191) NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE `UsersBoughtPerformances` ADD CONSTRAINT `UsersBoughtPerformances_reservationTimeId_fkey` FOREIGN KEY (`reservationTimeId`) REFERENCES `ReservationTime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
