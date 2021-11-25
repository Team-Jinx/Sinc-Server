/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nickname]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nickname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `name`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isPushNotification` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `nickname` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `profileUrl` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `Post`;

-- CreateTable
CREATE TABLE `Artist` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `agency` VARCHAR(191) NULL,
    `profileUrl` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Performance` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `cheerCount` INTEGER NOT NULL DEFAULT 0,
    `place` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL DEFAULT 0,
    `showTime` TEXT NOT NULL,
    `runningTime` INTEGER NOT NULL,
    `posterUrl` VARCHAR(191) NULL,
    `fundingStatus` ENUM('PROGRESS', 'SUCCESS') NOT NULL DEFAULT 'PROGRESS',
    `category` ENUM('MUSIC', 'DANCING', 'ACTING', 'OTHER') NOT NULL,
    `totalTicketCount` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `artistId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReservationTime` (
    `id` VARCHAR(191) NOT NULL,
    `toReservateAt` DATETIME(3) NOT NULL,
    `totalTicketCount` INTEGER NULL DEFAULT 0,
    `performanceId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Story` (
    `id` VARCHAR(191) NOT NULL,
    `backgroundUrl` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `cheerCount` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `performanceId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsersBoughtPerformances` (
    `id` VARCHAR(191) NOT NULL,
    `ticketCount` INTEGER NULL DEFAULT 0,
    `donation` INTEGER NULL DEFAULT 0,
    `reservationTime` DATETIME(3) NOT NULL,
    `bank` VARCHAR(191) NOT NULL,
    `paymentKey` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `receiptUrl` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `status` ENUM('PROGRESS', 'SUCCESS') NULL DEFAULT 'PROGRESS',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `performanceId` VARCHAR(191) NOT NULL,

    INDEX `UsersBoughtPerformances_userId_performanceId_idx`(`userId`, `performanceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsersCheeredPerformances` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `performanceId` VARCHAR(191) NULL,
    `storyId` VARCHAR(191) NULL,

    INDEX `UsersCheeredPerformances_userId_performanceId_storyId_idx`(`userId`, `performanceId`, `storyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `readAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `performanceId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `storyId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_nickname_key` ON `User`(`nickname`);

-- AddForeignKey
ALTER TABLE `Performance` ADD CONSTRAINT `Performance_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationTime` ADD CONSTRAINT `ReservationTime_performanceId_fkey` FOREIGN KEY (`performanceId`) REFERENCES `Performance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Story` ADD CONSTRAINT `Story_performanceId_fkey` FOREIGN KEY (`performanceId`) REFERENCES `Performance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersBoughtPerformances` ADD CONSTRAINT `UsersBoughtPerformances_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersBoughtPerformances` ADD CONSTRAINT `UsersBoughtPerformances_performanceId_fkey` FOREIGN KEY (`performanceId`) REFERENCES `Performance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersCheeredPerformances` ADD CONSTRAINT `UsersCheeredPerformances_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersCheeredPerformances` ADD CONSTRAINT `UsersCheeredPerformances_performanceId_fkey` FOREIGN KEY (`performanceId`) REFERENCES `Performance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersCheeredPerformances` ADD CONSTRAINT `UsersCheeredPerformances_storyId_fkey` FOREIGN KEY (`storyId`) REFERENCES `Story`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_performanceId_fkey` FOREIGN KEY (`performanceId`) REFERENCES `Performance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_storyId_fkey` FOREIGN KEY (`storyId`) REFERENCES `Story`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
