import { Request, Response } from 'express';
import * as modelService from '../services/modelService';
import { uploadSingleImage } from '../services/cloudinaryService';


export const createModel = async (req: Request, res: Response) => {
    const { name, brandId, description, fuelTypes } = req.body;
    const file = req.file;

    try {
        const modelImg = file ? await uploadSingleImage(file.buffer) : null;
        const fuelTypesArray = fuelTypes ? JSON.parse(fuelTypes) : undefined;


        const model = await modelService.createModelService(
            name,
            brandId,
            description,
            fuelTypesArray,
            modelImg
        );

        return res.status(201).json({ message: 'Model Created successfully.', model });
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

export const getAllModels = async (req: Request, res: Response) => {
    const { page = 1, limit = 10, search = '', sortField = 'name', sortOrder = 'asc' } = req.query;

    try {
        const models = await modelService.getAllModelsService({
            page: Number(page),
            limit: Number(limit),
            search: String(search),
            sortField: String(sortField),
            sortOrder: sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'asc',
        });
        return res.status(200).json(models);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const getModelById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const model = await modelService.getModelByIdService(id);
        if (!model) return res.status(404).json({ error: 'Model not found' });
        return res.status(200).json(model);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateModel = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, brandId, description, fuelType } = req.body;
    const file = req.file;

    try {
        const modelImg = file ? await uploadSingleImage(file.buffer) : null;

        const fuelTypesArray = fuelType ? JSON.parse(fuelType) : undefined;

        const updatedModel = await modelService.updateModelService(
            id,
            name,
            brandId,
            description,
            fuelTypesArray,
            modelImg
        );

        return res.status(200).json({ message: 'Model updated successfully.', model: updatedModel });
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

export const deleteModel = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const model = await modelService.deleteModelService(id);
        return res.status(200).json({ message: 'Model Deleted successfully.', model });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};
