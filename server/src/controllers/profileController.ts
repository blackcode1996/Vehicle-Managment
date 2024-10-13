/// <reference path="../types/index.d.ts" />
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import profileService from '../services/profileService';
import { validationResult } from 'express-validator';


export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;

        const profile = await profileService.getProfile(userId);

        if (!profile) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(profile);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId; 
        const role = req.user?.role;     
        const { targetUserId } = req.params;
        
        if (!userId || !role) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, address } = req.body;

        if (role !== 'SUPER_ADMIN' && userId !== targetUserId) {
            return res.status(403).json({ message: 'Unauthorized to update this profile' });
        }

        const profileIdToUpdate = targetUserId ? targetUserId : userId; 

        const updatedProfile = await profileService.updateProfile(profileIdToUpdate, { name, email, phone, address });

        res.status(200).json({ message: 'Profile updated successfully', updatedProfile });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
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
      const role = req.user?.role;
  
      if (role !== 'SUPER_ADMIN') {
        return res.status(403).json({ message: 'Unauthorized to reset passwords' });
      }
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { id } = req.params; 
      const { newPassword } = req.body;
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      const resetResult = await profileService.resetPassword(id, hashedPassword);
  
      if (!resetResult) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
};