import { FuelType } from '@prisma/client';
import prisma from '../models/index';

export const createModelService = async (
    name: string,
    brandId: string,
    description?: string,
    fuelTypes?: FuelType[],
    modelImg?: string | null
) => {
    const existingBrand = await prisma.brand.findUnique({
        where: { id: brandId },
    });

    if (!existingBrand) {
        throw new Error('Brand not found');
    }

    const model = await prisma.model.create({
        data: {
            name,
            description,
            brand: { connect: { id: brandId } },
            fuelTypes: fuelTypes ? { set: fuelTypes } : undefined,
            modelImg,
        },
    });

    return model;
};

export const getAllModelsService = async () => {
    return await prisma.model.findMany({
        include: {
            brand: true,
        },
    });
};

export const getModelByIdService = async (id: string) => {
    return await prisma.model.findUnique({
        where: { id },
        include: {
            brand: true,
        },
    });
};

export const updateModelService = async (
    id: string,
    name: string,
    brandId: string,
    description?: string,
    fuelTypes?: FuelType[],
    modelImg?: string | null
) => {
    const existingBrand = await prisma.brand.findUnique({
        where: { id: brandId },
    });

    if (!existingBrand) {
        throw new Error('Brand not found');
    }

    const updateData: any = {
        name,
        brand: { connect: { id: brandId } },
    };

    if (description) {
        updateData.description = description;
    }

    if (fuelTypes) {
        updateData.fuelTypes = { set: fuelTypes };
    }

    if (modelImg !== null) {
        updateData.modelImg = modelImg;
    }

    const updatedModel = await prisma.model.update({
        where: { id },
        data: updateData,
    });

    return updatedModel;
};

export const deleteModelService = async (id: string) => {
    return await prisma.model.delete({
        where: { id },
    });
};
