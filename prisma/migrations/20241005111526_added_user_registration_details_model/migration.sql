-- CreateTable
CREATE TABLE "UserRegistrationDetails" (
    "userID" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "DOB" TEXT,
    "CollegeYear" INTEGER NOT NULL,
    "pronouns" TEXT,
    "Hobbies" TEXT,
    "Gender" TEXT NOT NULL,

    CONSTRAINT "UserRegistrationDetails_pkey" PRIMARY KEY ("userID")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRegistrationDetails_userID_key" ON "UserRegistrationDetails"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "UserRegistrationDetails_username_key" ON "UserRegistrationDetails"("username");
