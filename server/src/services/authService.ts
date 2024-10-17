import { UserRole } from '@prisma/client';
import prisma from '../models/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateOTP } from 'simple-otp-generator';
import { sendEmail } from './emailService';
import path from 'path';

interface RegisterInput {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    otp: string;
}

interface LoginInput {
    email: string;
    password: string;
}

const register = async ({ name, email, password, role = 'CUSTOMER', otp }: RegisterInput) => {
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await sendEmail(email, 'Welcome to Caring!', path.join(__dirname, "../emailTemplates/otpVerificationmail.html"), { name, otp });

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
                otp,
                otpExpiresAt: new Date(Date.now() + 3 * 60 * 1000),
                otpAttempts: 0,
                blacklisted: false,
                blacklistUntil: null,
                verified: false
            },
        });

        return { id: user.id, name: user.name, email: user.email, role: user.role };
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
};

const verifyOTP = async (email: string, userOTP: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new Error('User not found');
    }

    if (user.blacklisted && user.blacklistUntil && user.blacklistUntil < new Date()) {
        throw new Error('Your account is blacklisted. Please try again later.');
    }

    if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
        console.log(new Date());
        console.log(user.otpExpiresAt);
        throw new Error('OTP has expired. Please request a new one.');
    }

    if (user.otp !== userOTP) {
        const updatedAttempts = user.otpAttempts + 1;

        if (updatedAttempts >= 4) {
            await prisma.user.update({
                where: { email },
                data: {
                    blacklisted: true,
                    blacklistUntil: new Date(Date.now() + 24 * 60 * 60 * 1000),
                },
            });
            await sendEmail(email, 'Welcome to Caring!', path.join(__dirname, "../emailTemplates/blacklistemail.html"), {name: user?.name} )

            throw new Error('You have exceeded the maximum number of attempts. Your account has been blacklisted for 1 day.');
        } else {
            await prisma.user.update({
                where: { email },
                data: { otpAttempts: updatedAttempts },
            });
            throw new Error(`Incorrect OTP. You have ${4 - updatedAttempts} attempts left.`);
        }
    }

    await sendEmail(email, 'Welcome to Caring!', path.join(__dirname, "../emailTemplates/Welcome.html"), {name: user?.name});

    await prisma.user.update({
        where: { email },
        data: {
            otp: null,
            otpAttempts: 0,
            verified: true,
            otpExpiresAt: null, 
        },
    });

    return true;
};

const resendOTP = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new Error('User not found');
    }

    if (user.blacklisted && user.blacklistUntil && user.blacklistUntil > new Date()) {
        throw new Error('Your account is blacklisted. Please try again later.');
    }

    const otp = generateOTP({ length: 6 });

    await prisma.user.update({
        where: { email },
        data: {
            otp,
            otpAttempts: 0, 
        },
    });

    await sendEmail(email, 'Your OTP Code', path.join(__dirname, '../emailTemplates/otpVerificationmail.html'), { otp });

    return true;
};

const login = async ({ email, password }: LoginInput) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new Error('Invalid credentials');
    }

    if (!user.verified) {
        throw new Error('Email not verified. Please verify your email before logging in.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!);

    return {
        user,
        token,
    };
};


export default {
    register,
    verifyOTP,
    resendOTP,
    login,
};