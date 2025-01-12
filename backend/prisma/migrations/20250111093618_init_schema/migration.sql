/*
  Warnings:

  - You are about to drop the column `iv` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "iv",
ALTER COLUMN "password" SET DATA TYPE TEXT;
