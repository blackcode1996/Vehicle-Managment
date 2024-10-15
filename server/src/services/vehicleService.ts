import prisma from '../models/index';

export const createVehicleService = async ({
    registrationNumber,
    modelId,
    shopId,
    adminId,
    role,
}: {
    registrationNumber: string;
    modelId: string;
    shopId?: string;
    adminId: string | undefined;
    role: string | undefined;
}) => {
    const existingVehicle = await prisma.vehicle.findUnique({
        where: { registrationNumber },
    });

    if (existingVehicle) {
        throw new Error('Vehicle already exists');
    }

    if (role === 'ADMIN') {
        const admin = await prisma.user.findUnique({ where: { id: adminId } });
        if (admin?.shopId !== shopId) {
            throw new Error('Unauthorized to create vehicle for this shop');
        }
    }

    const vehicle = await prisma.vehicle.create({
        data: {
            registrationNumber,
            model: { connect: { id: modelId } },
            admin: { connect: { id: adminId } },
            Shop: shopId ? { connect: { id: shopId } } : undefined,
        },
    });

    return vehicle;
};
export const updateVehicleService = async (id: string, { registrationNumber, modelId, shopId, bookedStatus }: { registrationNumber?: string, modelId?: string, shopId?: string, bookedStatus?: boolean }) => {
    const vehicle = await prisma.vehicle.update({
        where: { id },
        data: {
            registrationNumber,
            model: modelId ? { connect: { id: modelId } } : undefined,
            Shop: shopId ? { connect: { id: shopId } } : undefined,
            bookedStatus,
        },
    });

    return vehicle;
};

export const deleteVehicleService = async (id: string) => {
    // Delete vehicle
    const vehicle = await prisma.vehicle.delete({
        where: { id },
    });

    return vehicle;
};
