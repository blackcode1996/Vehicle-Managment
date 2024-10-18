import prisma from '../models/index';
import { differenceInHours, differenceInMinutes } from 'date-fns';
import { BookingStatus } from '@prisma/client';
import { getAddressFromLocation } from '../utlis/geocoder';


interface BookingData {
    vehicleId: string;
    userId: string;
    bookedFrom: Date;
    bookedTo: Date;
    bookingFromLocation: number[];
    bookingToLocation: number[];
}

export const createBooking = async ({
    vehicleId,
    userId,
    bookedFrom,
    bookedTo,
    bookingFromLocation,
    bookingToLocation
}: BookingData) => {
    const existingBooking = await prisma.booking.findFirst({
        where: {
            vehicleId,
            OR: [
                { bookedFrom: { lte: bookedTo }, bookedTo: { gte: bookedFrom } },
            ],
        },
    });

    if (existingBooking) {
        throw new Error('Vehicle is already booked for the specified time period.');
    }

    const vehicle = await prisma.vehicle.findUnique({
        where: { id: vehicleId },
        include: { Shop: true }
    });

    if (!vehicle) {
        throw new Error('Vehicle not found.');
    }

    const shopId = vehicle.shopId;

    const bookingFromAddress = await getAddressFromLocation(bookingFromLocation[0], bookingFromLocation[1]);
    const bookingToAddress = await getAddressFromLocation(bookingToLocation[0], bookingToLocation[1]);

    const numberOfHours = differenceInHours(new Date(bookedTo), new Date(bookedFrom));
    const totalAmount = vehicle.perHourCharge * numberOfHours;

    const booking = await prisma.booking.create({
        data: {
            bookedFrom,
            bookedTo,
            bookingFromAddress,
            bookingToAddress,
            bookingFromLocation,
            bookingToLocation,
            numberOfHours,
            totalAmount,
            status: 'PENDING',
            vehicle: { connect: { id: vehicleId } },
            user: { connect: { id: userId } },
            ...(shopId && { shop: { connect: { id: shopId } } })
        },
    });

    await prisma.vehicle.update({
        where: { id: vehicleId },
        data: { bookedStatus: true },
    });

    return booking;
};

export const getAllBookings = async () => {
    return await prisma.booking.findMany({
        include: {
            vehicle: true,
            user: true,
            shop: true,
        },
    });
};

export const getAdminBookings = async (adminId: string | undefined) => {
    const adminShop = await prisma.shop.findUnique({
        where: { userId: adminId },
        include: { vehicles: true },
    });

    if (!adminShop) {
        throw new Error('Admin shop not found');
    }

    return await prisma.booking.findMany({

        where: {
            vehicleId: { in: adminShop.vehicles.map(vehicle => vehicle.id) },
        },
        include: {
            vehicle: true,
            user: true,
            shop: true,
        },
    });
};

export const getCustomerBookings = async (customerId: string | undefined) => {
    return await prisma.booking.findMany({
        where: {
            userId: customerId,
        },
        include: {
            vehicle: true,
            user: true,
            shop: true,
        },
    });
};

export const getBookingById = async (id: string) => {
    return await prisma.booking.findUnique({
        where: { id },
        include: {
            vehicle: true,
            user: true,
            shop: true,
        },
    });
};

export const updateBookingStatus = async (id: string, decision: BookingStatus) => {
    const updatedBooking = await prisma.booking.update({
        where: { id },
        data: { status: decision },
    });

    if (!updatedBooking) {
        throw new Error('Booking not found');
    }

    if (decision === BookingStatus.DECLINED) {
        await prisma.vehicle.update({
            where: { id: updatedBooking.vehicleId },
            data: { bookedStatus: false },
        });
    }

    return updatedBooking;
}

export const cancelBooking = async (id: string) => {
    const booking = await prisma.booking.findUnique({
        where: { id },
    });

    if (!booking) {
        throw new Error('Booking not found');
    }

    if (booking.status === BookingStatus.PENDING) {
        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: {
                status: BookingStatus.CANCELLED,
                cancellationCharges: 0,
                cancellationDate: new Date(),
            },
        });

        await prisma.vehicle.update({
            where: { id: booking.vehicleId },
            data: { bookedStatus: false },
        });

        return updatedBooking;
    }

    const now = new Date();
    const differenceInTime = differenceInMinutes(now, new Date(booking.bookedFrom));

    let cancellationCharges = 0;

    if (differenceInTime <= 120) {
        const penaltyPercentage = 0.2;
        cancellationCharges = booking.totalAmount * penaltyPercentage;
    }

    const updatedBooking = await prisma.booking.update({
        where: { id },
        data: {
            status: BookingStatus.CANCELLED,
            cancellationCharges,
            cancellationDate: new Date(),
        },
    });

    await prisma.vehicle.update({
        where: { id: booking.vehicleId },
        data: { bookedStatus: false },
    });

    return updatedBooking;
};
