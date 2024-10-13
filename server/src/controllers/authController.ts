import { Request, Response } from 'express';
import authService from '../services/authService';
import { validateRequiredFields } from '../utlis/errorHandlers/AllFieldErrorHandler';
import { validationResult } from 'express-validator';
import { UserRole } from '@prisma/client';

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

        const user = await authService.register({ name, email, password, role });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

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
