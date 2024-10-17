import { Prisma } from '@prisma/client';
import prisma from '../models/index';

export const createShopService = async ({ name, description, address, userId }: { name: string, description: string, address: string, userId: string }) => {
    return await prisma.shop.create({
        data: {
            name,
            description,
            address,
            userId
        }
    });
};

export const getShopsService = async ({
    page,
    limit,
    search,
    sortField = 'name',
    sortOrder = 'asc',
}: {
    page: number;
    limit: number;
    search: string;
    sortField: string;
    sortOrder: 'asc' | 'desc';
}) => {
    const skip = (page - 1) * limit;

    const where = search
        ? {
            name: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
            },
        }
        : {};

    const shops = await prisma.shop.findMany({
        where,
        orderBy: { [sortField]: sortOrder },
        skip,
        take: limit,
    });

    const totalShops = await prisma.shop.count({ where });

    return {
        data: shops,
        totalShops,
        totalPages: Math.ceil(totalShops / limit),
        currentPage: page,
    };
};

export const getShopByIdService = async (id: string) => {
    return await prisma.shop.findUnique({
        where: { id },
    });
};

export const updateShopService = async (id: string, data: { name?: string; description?: string; address?: string }) => {
    return await prisma.shop.update({
        where: { id },
        data,
    });
};

export const deleteShopService = async (id: string) => {
    return await prisma.shop.delete({
        where: { id },
    });
};
