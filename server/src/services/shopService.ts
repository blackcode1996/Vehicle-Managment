import prisma  from '../models/index';

export const createShopService = async ({ name, description, address, userId }: { name: string, description: string, address: string, userId: string}) => {
    return await prisma.shop.create({
        data: {
            name,
            description,
            address,
            userId 
        }
    });
};

export const getShopsService = async () => {
    return await prisma.shop.findMany();
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
