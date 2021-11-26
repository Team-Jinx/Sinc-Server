/*
  Warnings:

  - Added the required column `updatedAt` to the `ReservationTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UsersCheeredPerformances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ReservationTime` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `UsersCheeredPerformances` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
