/*
  Warnings:

  - You are about to drop the column `grade` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the `DocumentToSubject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `received_grade` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `DocumentToSubject` DROP FOREIGN KEY `DocumentToSubject_document_id_fkey`;

-- DropForeignKey
ALTER TABLE `DocumentToSubject` DROP FOREIGN KEY `DocumentToSubject_subject_id_fkey`;

-- AlterTable
ALTER TABLE `Assignment` DROP COLUMN `grade`,
    ADD COLUMN `received_grade` TINYINT UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `password` BINARY(60) NOT NULL;

-- DropTable
DROP TABLE `DocumentToSubject`;
