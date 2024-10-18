/*
  Warnings:

  - The `status` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `bookingFromAddress` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingToAddress` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "bookingFromAddress" TEXT NOT NULL,
ADD COLUMN     "bookingFromLocation" TEXT[],
ADD COLUMN     "bookingToAddress" TEXT NOT NULL,
ADD COLUMN     "bookingToLocation" TEXT[],
ADD COLUMN     "cancellationCharges" DOUBLE PRECISION,
ADD COLUMN     "cancellationDate" TIMESTAMP(3),
DROP COLUMN "status",
ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'PENDING';
