/*
  Warnings:

  - Added the required column `passwordHash` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Account` ADD COLUMN `passwordHash` VARCHAR(191) NOT NULL;
