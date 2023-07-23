-- AlterTable
ALTER TABLE `User` ADD COLUMN `showBirthDate` ENUM('AGE', 'DATE', 'NONE') NOT NULL DEFAULT 'AGE';
