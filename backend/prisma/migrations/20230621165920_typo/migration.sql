/*
  Warnings:

  - You are about to drop the column `delivieredAt` on the `Letter` table. All the data in the column will be lost.
  - Added the required column `deliveredAt` to the `Letter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Letter` DROP COLUMN `delivieredAt`,
    ADD COLUMN `deliveredAt` DATETIME(3) NOT NULL;
