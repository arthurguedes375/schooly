-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(40) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(70) NOT NULL,
    `profile_picture` VARCHAR(40) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subject` (
    `id` VARCHAR(40) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `required` BOOLEAN NOT NULL,
    `required_grade` TINYINT UNSIGNED NOT NULL,
    `records` TINYINT UNSIGNED NULL,
    `user_id` VARCHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Assignment` (
    `id` VARCHAR(40) NOT NULL,
    `subject_id` VARCHAR(40) NOT NULL,
    `document_id` VARCHAR(40) NOT NULL,
    `grade` TINYINT UNSIGNED NOT NULL,
    `record_id` VARCHAR(40) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentToSubject` (
    `id` VARCHAR(40) NOT NULL,
    `subject_id` VARCHAR(40) NOT NULL,
    `document_id` VARCHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Document` (
    `id` VARCHAR(40) NOT NULL,
    `picture_id` VARCHAR(40) NOT NULL,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Record` (
    `id` VARCHAR(40) NOT NULL,
    `grade` TINYINT UNSIGNED NOT NULL,
    `subject_id` VARCHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_document_id_fkey` FOREIGN KEY (`document_id`) REFERENCES `Document`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_record_id_fkey` FOREIGN KEY (`record_id`) REFERENCES `Record`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentToSubject` ADD CONSTRAINT `DocumentToSubject_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentToSubject` ADD CONSTRAINT `DocumentToSubject_document_id_fkey` FOREIGN KEY (`document_id`) REFERENCES `Document`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Record` ADD CONSTRAINT `Record_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
