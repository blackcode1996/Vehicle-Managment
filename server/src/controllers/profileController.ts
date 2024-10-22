/// <reference path="../types/index.d.ts" />
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import profileService from '../services/profileService';
import { validationResult } from 'express-validator';
import { uploadSingleImage } from '../services/cloudinaryService';


export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;

        const profile = await profileService.getProfile(userId);

        if (!profile) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(201).json({ message: 'Profile received successfully.', profile });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, phone, address } = req.body;
        const file = req.file;

        const updatedData: any = {};

        if (name) updatedData.name = name;
        if (phone) updatedData.phone = phone;
        if (address) updatedData.address = address;

        if (file) {
            const avatar = await uploadSingleImage(file.buffer);
            updatedData.avatar = avatar;
        }

        const updatedProfile = await profileService.updateProfile(userId, updatedData);

        res.status(200).json({ message: 'Profile updated successfully', updatedProfile });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message || 'An error occurred while updating the profile' });
    }
};


export const getAllProfiles = async (req: Request, res: Response) => {
    try {
        const role = req.user?.role;

        if (role !== 'SUPER_ADMIN') {
            return res.status(403).json({ message: 'Unauthorized to view all profiles' });
        }

        const profiles = await profileService.getAllProfiles();

        res.status(200).json(profiles);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProfile = async (req: Request, res: Response) => {
    try {
        const role = req.user?.role;

        if (role !== 'SUPER_ADMIN') {
            return res.status(403).json({ message: 'Unauthorized to delete this profile' });
        }

        const { id } = req.params;
        const deletedProfile = await profileService.deleteProfile(id);

        if (!deletedProfile) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: 'New password and confirmation do not match' });
        }

        const user = await profileService.getUserById(userId);
        if (!user || !user.password) {
            return res.status(404).json({ message: 'User not found or invalid password' });
        }

        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await profileService.resetPassword(userId, hashedPassword);

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};