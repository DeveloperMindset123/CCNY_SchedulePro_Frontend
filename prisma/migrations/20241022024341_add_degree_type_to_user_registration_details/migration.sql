/*
  Warnings:

  - Added the required column `degreeType` to the `UserRegistrationDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserRegistrationDetails" ADD COLUMN     "degreeType" TEXT NOT NULL;
