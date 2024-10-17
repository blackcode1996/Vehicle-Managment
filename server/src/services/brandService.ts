import { Prisma } from '@prisma/client';
import prisma from '../models/index';


export const createBrandService = async (name: string, logoUrl: string | null, description: string) => {
    const existingBrand = await prisma.brand.findUnique({
        where: { name },
    });

    if (existingBrand) {
        throw new Error('Brand already exists');
    }

    const brand = await prisma.brand.create({
        data: {
            name,
            logo: logoUrl,
            description
        },
    });

    return brand;
};

export const getAllBrandsService = async ({
    page,
    limit,
    search,
    sortField = 'name',
    sortOrder = 'asc'
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

    const brands = await prisma.brand.findMany({
        where,
        orderBy: { [sortField]: sortOrder },
        skip,
        take: limit,
    });

    const totalBrands = await prisma.brand.count({ where });

    return {
        data: brands,
        totalBrands,
        totalPages: Math.ceil(totalBrands / limit),
        currentPage: page,
    };
};

export const getBrandByIdService = async (id: string) => {
    return await prisma.brand.findUnique({
        where: { id },
    });
};

export const updateBrandService = async (
    id: string,
    name: string,
    description: string | undefined,
    logo: string | null
) => {

    const brand = await prisma.brand.update({
        where: { id },
        data: {
            name,
            description,
            logo
        },
    });

    return brand;
};

export const deleteBrandService = async (id: string) => {
    return await prisma.brand.delete({
        where: { id },
    });
};
