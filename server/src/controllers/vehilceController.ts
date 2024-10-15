// vehicleController.ts
import { Request, Response } from 'express';
import { createVehicleService, updateVehicleService, deleteVehicleService } from '../services/vehicleService';

export const createVehicle = async (req: Request, res: Response) => {
    const { registrationNumber, modelId, shopId } = req.body;
    const adminId = req.user?.userId;
    const role = req.user?.role;

    try {
        const vehicle = await createVehicleService({ registrationNumber, modelId, shopId, adminId, role });
        res.status(201).json({ message: 'Vehicle created successfully', vehicle });
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating vehicle', error: error.message });
    }
};

export const updateVehicle = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { registrationNumber, modelId, shopId, bookedStatus } = req.body;

    try {
        const vehicle = await updateVehicleService(id, { registrationNumber, modelId, shopId, bookedStatus });
        res.status(200).json({ message: 'Vehicle updated successfully', vehicle });
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating vehicle', error: error.message });
    }
};

export const deleteVehicle = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const vehicle = await deleteVehicleService(id);
        res.status(200).json({ message: 'Vehicle deleted successfully', vehicle });
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting vehicle', error: error.message });
    }
};
