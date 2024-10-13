import { UserRole } from '@prisma/client';
import prisma from '../models/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface RegisterInput {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

interface LoginInput {
    email: string;
    password: string;
}

const register = async ({ name, email, password, role = 'CUSTOMER' }: RegisterInput) => {
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        });
        return user
    } catch (error) {
        throw new Error('Something went wrong');
    }

};


const login = async ({ email, password }: LoginInput) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!);

    return {
        user,
        token
    }
};


export default {
    register,
    login,
};