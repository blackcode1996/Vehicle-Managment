/*
  Warnings:

  - Added the required column `fuelType` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perHourCharge` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID');

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "fuelType" "FuelType" NOT NULL,
ADD COLUMN     "perHourCharge" DOUBLE PRECISION NOT NULL;
