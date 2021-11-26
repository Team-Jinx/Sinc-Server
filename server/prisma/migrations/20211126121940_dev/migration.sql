/*
  Warnings:

  - You are about to drop the column `toReservateAt` on the `ReservationTime` table. All the data in the column will be lost.
  - Added the required column `toReserveAt` to the `ReservationTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ReservationTime` DROP COLUMN `toReservateAt`,
    ADD COLUMN `toReserveAt` DATETIME(3) NOT NULL;
