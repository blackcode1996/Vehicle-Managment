import { Request, Response } from 'express';
import * as bookingService from '../services/bookingService';
import { BookingStatus } from '@prisma/client';


export const createBooking = async (req: Request, res: Response) => {
    const {
        vehicleId,
        userId,
        bookedFrom,
        bookedTo,
        bookingFromLocation,
        bookingToLocation
    } = req.body;

    try {
        const booking = await bookingService.createBooking({
            vehicleId,
            userId,
            bookedFrom,
            bookedTo,
            bookingFromLocation,
            bookingToLocation
        });

        return res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

export const getAllBookings = async (req: Request, res: Response) => {
    const role = req.user?.role;
    const userId = req.user?.userId;

    try {
        let bookings;

        if (role === "SUPER_ADMIN") {
            bookings = await bookingService.getAllBookings();
        } else if (role === "ADMIN") {
            bookings = await bookingService.getAdminBookings(userId);
        } else if (role === "CUSTOMER") {
            bookings = await bookingService.getCustomerBookings(userId);
        }

        return res.status(200).json(bookings);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const getBookingById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const booking = await bookingService.getBookingById(id);
        return res.status(200).json(booking);
    } catch (error: any) {
        return res.status(404).json({ error: 'Booking not found' });
    }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { decision } = req.body;
    const { role }: any = req.user;

    if (role !== 'ADMIN') {
        return res.status(403).json({ error: 'Only ADMIN can make this decision' });
    }

    if (![BookingStatus.ACCEPTED, BookingStatus.DECLINED].includes(decision)) {
        return res.status(400).json({ error: 'Invalid decision' });
    }

    try {
        const updatedBooking = await bookingService.updateBookingStatus(id, decision);
        return res.status(200).json({ message: `Booking ${decision.toLowerCase()} successfully`, updatedBooking });
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

export const cancelBooking = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const booking = await bookingService.cancelBooking(id);
        return res.status(200).json({ message: 'Booking cancelled successfully', booking });
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};
