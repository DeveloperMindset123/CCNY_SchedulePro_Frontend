/*
  Warnings:

  - A unique constraint covering the columns `[emailDuplicate]` on the table `UserRegistrationDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailDuplicate` to the `UserRegistrationDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserRegistrationDetails" ADD COLUMN     "emailDuplicate" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserRegistrationDetails_emailDuplicate_key" ON "UserRegistrationDetails"("emailDuplicate");
