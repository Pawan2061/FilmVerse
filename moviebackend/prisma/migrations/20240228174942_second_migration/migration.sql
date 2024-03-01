-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Viewer', 'host');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Viewer';
