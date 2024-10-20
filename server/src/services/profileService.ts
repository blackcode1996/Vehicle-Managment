import prisma from '../models/index'

const getProfile = async (id: string | undefined) => {
    return await prisma.user.findUnique({
        where: { id },
    });
};

const updateProfile = async (id: string, data: { name?: string; phone?: string; address?: string; avatar?: string | null }) => {
    return await prisma.user.update({
        where: { id },
        data,
    });
};

const getAllProfiles = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
            role: true,
        }
    });
};

const deleteProfile = async (id: string) => {
    return prisma.user.delete({
        where: {
            id: id
        }
    });
};

const getUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id },
    });
};

const resetPassword = async (id: string, hashedPassword: string) => {
    return await prisma.user.update({
        where: { id },
        data: { password: hashedPassword },
    });
};

export default {
    getProfile,
    updateProfile,
    getAllProfiles,
    deleteProfile,
    getUserById,
    resetPassword
}