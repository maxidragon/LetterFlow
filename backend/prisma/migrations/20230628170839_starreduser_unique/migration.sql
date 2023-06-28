/*
  Warnings:

  - A unique constraint covering the columns `[userId,starredById]` on the table `StarredUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `StarredUser_userId_starredById_key` ON `StarredUser`(`userId`, `starredById`);
