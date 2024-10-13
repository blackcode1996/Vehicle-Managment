import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Export the Prisma client instance to use in other files
export default prisma;