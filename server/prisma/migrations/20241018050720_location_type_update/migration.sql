/*
  Warnings:

  - The `bookingFromLocation` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bookingToLocation` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "bookingFromLocation",
ADD COLUMN     "bookingFromLocation" INTEGER[],
DROP COLUMN "bookingToLocation",
ADD COLUMN     "bookingToLocation" INTEGER[];
