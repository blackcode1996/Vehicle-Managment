/*
  Warnings:

  - The `vehicleImg` column on the `Vehicle` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "vehicleImg",
ADD COLUMN     "vehicleImg" TEXT[];
