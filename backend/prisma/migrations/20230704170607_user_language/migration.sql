/*
  Warnings:

  - A unique constraint covering the columns `[userId,languageId]` on the table `UserLanguage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserLanguage_userId_languageId_key` ON `UserLanguage`(`userId`, `languageId`);
