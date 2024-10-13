import prisma from '../models/index'

const getProfile = async (id: string | undefined) => {
    return await prisma.user.findUnique({
        where: { id },
    });
};

const updateProfile = async (id: string, data: { name?: string; email?: string; phone?: string; address?: string }) => {
    if (data.email) {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });

       
        if (existingUser && existingUser.id !== id) {
            throw new Error('Email is already in use by another user');
        }
    }

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

const resetPassword = async (id: string, hashedPassword: string) => {
    return prisma.user.update({
        where: { id: id },
        data: { password: hashedPassword },
    });
};


export default {
    getProfile,
    updateProfile,
    getAllProfiles,
    deleteProfile,
    resetPassword
}