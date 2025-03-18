/*
  Warnings:

  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Event` table. All the data in the column will be lost.
  - Added the required column `eventDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventName` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` DROP COLUMN `date`,
    DROP COLUMN `tag`,
    DROP COLUMN `title`,
    ADD COLUMN `eventDate` DATETIME(3) NOT NULL,
    ADD COLUMN `eventName` VARCHAR(191) NOT NULL,
    ADD COLUMN `tags` JSON NOT NULL,
    MODIFY `endTime` VARCHAR(191) NOT NULL,
    MODIFY `startTime` VARCHAR(191) NOT NULL;
