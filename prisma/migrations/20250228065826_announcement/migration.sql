-- AlterTable
ALTER TABLE "Announcement" ALTER COLUMN "balance" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "balance" INTEGER NOT NULL DEFAULT 5000000;
