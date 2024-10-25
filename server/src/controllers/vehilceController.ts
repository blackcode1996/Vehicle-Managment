import { Request, Response } from 'express';
import * as vehicleService from '../services/vehicleService';
import { uploadMultipleImages } from '../services/cloudinaryService';
import { UserRole } from '@prisma/client';


export const createVehicle = async (req: Request, res: Response) => {
    const { registrationNumber, modelId, shopId, perHourCharge, fuelType } = req.body;
    const adminId = req?.user?.userId;

    console.log(adminId);

    const files: any = req.files;

    try {
        const vehicleImg = files ? await uploadMultipleImages(files.map((file: any) => file.buffer)) : undefined;

        const vehicle = await vehicleService.createVehicleService({
            registrationNumber,
            modelId,
            shopId,
            adminId,
            perHourCharge: parseFloat(perHourCharge),
            fuelType,
            vehicleImg: vehicleImg?.map((img) => img.secure_url),
        });

        return res.status(201).json({ message: "Vehicle created successfully.", vehicle });
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};


export const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const {
      page = 1, 
      limit = 10, 
      search = '', 
      sortField = 'registrationNumber', 
      sortOrder = 'asc', 
      brand, 
      model, 
    } = req.query;

    const { user } = req;

    const parsedPage = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);

    let adminId: string | null = null;

    if (user && user.role === UserRole.ADMIN) {
      adminId = user.userId;
    }

    const vehicles = await vehicleService.getAllVehiclesService({
      page: parsedPage,
      limit: parsedLimit,
      search: search as string,
      sortField: sortField as string,
      sortOrder: sortOrder as 'asc' | 'desc',
      adminId,
      brand: brand as string,
      model: model as string,
    });

    return res.status(200).json({ message: "Vehicles received successfully", vehicles });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};





export const getVehicleById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const vehicle = await vehicleService.getVehicleByIdService(id);
        if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
        return res.status(200).json(vehicle);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateVehicle = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        registrationNumber,
        modelId,
        shopId,
        perHourCharge,
        fuelType,
    } = req.body;

    const files: any = req.files;

    console.log(files);

    try {
        const vehicleImg = files ? await uploadMultipleImages(files.map((file: any) => file.buffer)) : undefined;


        const vehicle = await vehicleService.updateVehicleService(id, {
            registrationNumber,
            modelId,
            shopId,
            perHourCharge: parseFloat(perHourCharge),
            fuelType,
            vehicleImg: vehicleImg?.map((img) => img.secure_url),
        });

        return res.status(200).json({ message: "Vehicle updated successfully.", vehicle });
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

export const deleteVehicle = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const vehicle = await vehicleService.deleteVehicleService(id);
        return res.status(200).json(vehicle);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};
