import { Request, Response } from 'express';
import {
    createShopService,
    getShopsService,
    updateShopService,
    deleteShopService,
    getShopByIdService
} from '../services/shopService';
import { validateRequiredFields } from '../utlis/errorHandlers/AllFieldErrorHandler';

export const createShop = async (req: Request, res: Response) => {

    try {
        const { name, description, address, adminId } = req.body;
        const userId = req.user?.userId;
        const userRole = req.user?.role;

        const requiredFields = ['name', 'description', 'address', 'adminId'];
        validateRequiredFields(requiredFields, req.body);

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: User ID is required.' });
        }

        if (userRole === 'SUPER_ADMIN' && adminId) {
            const shop = await createShopService({ name, description, address, userId: adminId });
            return res.status(201).json({ message: 'Shop created successfully', shop });
        }

        const shop = await createShopService({ name, description, address, userId });
        res.status(201).json({ message: 'Shop created successfully', shop });
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ error: error.message || 'Something went wrong' });
    }

};

export const getShops = async (req: Request, res: Response) => {
    const { page = 1, limit = 10, search = '', sortField = 'name', sortOrder = 'asc' } = req.query;

    try {
        const shops = await getShopsService({
            page: Number(page),
            limit: Number(limit),
            search: String(search),
            sortField: String(sortField),
            sortOrder: sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'asc',
        });
        return res.status(201).json({message:"Shops received successfully",shops});
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching shops', error: error.message });
    }
}

export const updateShop = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, address } = req.body;
    const userId = req.user?.userId;
    const userRole = req.user?.role;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID is required.' });
    }

    try {
        const shop = await getShopByIdService(id);

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found.' });
        }

        if (userRole !== 'SUPER_ADMIN' && shop.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized to update this shop' });
        }

        const updatedShop = await updateShopService(id, { name, description, address });
        res.status(200).json({ message: 'Shop updated successfully', updatedShop });
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating shop', error: error.message });
    }
};

export const deleteShop = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.userId;
    const userRole = req.user?.role;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID is required.' });
    }

    try {
        const shop = await getShopByIdService(userId);

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found.' });
        }

        if (userRole !== 'SUPER_ADMIN' && shop.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized to delete this shop' });
        }

        await deleteShopService(id);
        res.status(204).json({ message: 'Shop deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting shop', error: error.message });
    }
};
