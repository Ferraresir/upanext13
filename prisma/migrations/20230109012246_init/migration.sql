/*
  Warnings:

  - Added the required column `apellido` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectorId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "apellido" TEXT NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "nombre" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'User',
ADD COLUMN     "sectorId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Sectors" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Sectors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
