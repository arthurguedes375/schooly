/*
  Warnings:

  - You are about to drop the column `document_id` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `received_grade` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `record_id` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `subject_id` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `picture_id` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `required_grade` on the `Subject` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lowest_min_grade` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Assignment` DROP FOREIGN KEY `Assignment_document_id_fkey`;

-- DropForeignKey
ALTER TABLE `Assignment` DROP FOREIGN KEY `Assignment_record_id_fkey`;

-- DropForeignKey
ALTER TABLE `Assignment` DROP FOREIGN KEY `Assignment_subject_id_fkey`;

-- AlterTable
ALTER TABLE `Assignment` DROP COLUMN `document_id`,
    DROP COLUMN `received_grade`,
    DROP COLUMN `record_id`,
    DROP COLUMN `subject_id`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Document` DROP COLUMN `picture_id`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Subject` DROP COLUMN `required_grade`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `lowest_min_grade` TINYINT UNSIGNED NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `AssignmentsToSubjects` (
    `id` VARCHAR(40) NOT NULL,
    `subject_id` VARCHAR(40) NOT NULL,
    `assignment_id` VARCHAR(40) NOT NULL,
    `received_grade` TINYINT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentsToAssignments` (
    `id` VARCHAR(40) NOT NULL,
    `document_id` VARCHAR(40) NOT NULL,
    `assignment_id` VARCHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SecurityCodes` (
    `code` VARCHAR(7) NOT NULL,
    `user_id` VARCHAR(40) NOT NULL,
    `expires_at` TIMESTAMP NOT NULL,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AssignmentsToSubjects` ADD CONSTRAINT `AssignmentsToSubjects_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssignmentsToSubjects` ADD CONSTRAINT `AssignmentsToSubjects_assignment_id_fkey` FOREIGN KEY (`assignment_id`) REFERENCES `Assignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentsToAssignments` ADD CONSTRAINT `DocumentsToAssignments_assignment_id_fkey` FOREIGN KEY (`assignment_id`) REFERENCES `Assignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentsToAssignments` ADD CONSTRAINT `DocumentsToAssignments_document_id_fkey` FOREIGN KEY (`document_id`) REFERENCES `Document`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
