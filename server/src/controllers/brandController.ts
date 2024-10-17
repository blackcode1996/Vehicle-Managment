import { Request, Response } from 'express';
import * as brandService from '../services/brandService';
import { uploadSingleImage } from '../services/cloudinaryService';

export const createBrand = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const file = req.file;

    try {
        const logoUrl = file ? await uploadSingleImage(file.buffer) : null;
        const brand = await brandService.createBrandService(name, logoUrl, description);
        return res.status(201).json({ message: 'Brand Created successfully.', brand });

    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

export const getAllBrands = async (req: Request, res: Response) => {
    try {
        const brands = await brandService.getAllBrandsService();
        return res.status(200).json(brands);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const getBrandById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const brand = await brandService.getBrandByIdService(id);
        if (!brand) return res.status(404).json({ error: 'Brand not found' });
        return res.status(200).json(brand);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateBrand = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const file = req.file;

    try {
        const logoUrl = file ? await uploadSingleImage(file.buffer) : null;
        const brand = await brandService.updateBrandService(id, name, description, logoUrl);
        return res.status(200).json({message: 'Brand Updated successfully.',brand});
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

export const deleteBrand = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const brand = await brandService.deleteBrandService(id);
        return res.status(200).json({message: 'Brand deleted successfully.',brand});
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};
