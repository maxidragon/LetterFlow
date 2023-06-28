-- CreateTable
CREATE TABLE `StarredUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `starredById` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StarredUser` ADD CONSTRAINT `StarredUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StarredUser` ADD CONSTRAINT `StarredUser_starredById_fkey` FOREIGN KEY (`starredById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
