/*
  Warnings:

  - You are about to drop the column `profileImageName` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `profileImagePath` on the `Users` table. All the data in the column will be lost.
  - Added the required column `profileImage` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "profileImageName",
DROP COLUMN "profileImagePath",
ADD COLUMN     "profileImage" TEXT NOT NULL;
