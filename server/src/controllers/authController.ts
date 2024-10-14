import { Request, Response } from 'express';
import authService from '../services/authService';
import { validateRequiredFields } from '../utlis/errorHandlers/AllFieldErrorHandler';
import { validationResult } from 'express-validator';
import { UserRole } from '@prisma/client';
import { generateOTP } from 'simple-otp-generator';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const requiredFields = ['name', 'email', 'password'];
        validateRequiredFields(requiredFields, req.body);

        const { name, email, password, role } = req.body;

        if (role && !Object.values(UserRole).includes(role)) {
            return res.status(400).json({ error: 'Role must be one of: CUSTOMER, ADMIN, SUPER_ADMIN' });
        }

        const otp = generateOTP({ length: 6 });

        const user = await authService.register({ name, email, password, role, otp });

        res.status(201).json({ message: 'User registered successfully. Please check your mail to verify your email.', user });
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ error: error.message || 'Something went wrong' });
    }
};

export const verifyOTP = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, otp } = req.body;

        const verified = await authService.verifyOTP(email, otp);
        if (verified) {
            res.status(200).json({ message: 'OTP verified successfully' });
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const resendOTP = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email } = req.body;

        const sent = await authService.resendOTP(email);
        if (sent) {
            return res.status(200).json({ message: 'OTP has been resent. Please check your email.' });
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const requiredFields = ['email', 'password'];
        validateRequiredFields(requiredFields, req.body);

        const { email, password } = req.body;
        const data = await authService.login({ email, password });
        res.status(200).json({ message: 'Login successful', data });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
