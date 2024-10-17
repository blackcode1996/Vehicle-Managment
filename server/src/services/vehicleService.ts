import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../models/index';


export const createVehicleService = async ({
  registrationNumber,
  modelId,
  shopId,
  adminId,
  perHourCharge,
  fuelType,
  vehicleImg,
}: {
  registrationNumber: string;
  modelId: string;
  shopId?: string;
  adminId: string | undefined;
  perHourCharge: number;
  fuelType: 'PETROL' | 'DIESEL' | 'ELECTRIC' | 'HYBRID';
  vehicleImg?: string[];
}) => {

  const existingVehicle = await prisma.vehicle.findUnique({
    where: { registrationNumber },
  });

  if (existingVehicle) {
    throw new Error('Vehicle already exists');
  }

  const vehicle = await prisma.vehicle.create({
    data: {
      registrationNumber,
      model: { connect: { id: modelId } },
      admin: { connect: { id: adminId } },
      Shop: shopId ? { connect: { id: shopId } } : undefined,
      perHourCharge,
      fuelType,
      vehicleImg,
    },
    include: {
      model: true,
      admin: true,
      Shop: true,
      bookings: true
    }
  });

  return vehicle;
};


export const getAllVehiclesService = async ({
  page,
  limit,
  search,
  sortField = 'registrationNumber',
  sortOrder = 'asc',
}: {
  page: number;
  limit: number;
  search: string;
  sortField: string;
  sortOrder: 'asc' | 'desc';
}) => {
  const skip = (page - 1) * limit;

  const processedSearch = search ? search.replace(/[^a-zA-Z0-9]/g, '') : '';

  // Prepare the "where" clause
  const where: Prisma.VehicleWhereInput = search
    ? {
      OR: [
        {
          registrationNumber: { contains: search, mode: Prisma.QueryMode.insensitive },
        },
        {
          registrationNumber: { contains: processedSearch, mode: Prisma.QueryMode.insensitive },
        },
        {
          model: { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
        },
      ],
    }
    : {};

  const vehicles = await prisma.vehicle.findMany({
    where,
    orderBy: { [sortField]: sortOrder },
    skip,
    take: limit,
    include: {
      model: true,
      Shop: true,
      admin: true,
    },
  });

  const totalVehicles = await prisma.vehicle.count({ where });

  return {
    data: vehicles,
    totalVehicles,
    totalPages: Math.ceil(totalVehicles / limit),
    currentPage: page,
  };
};

export const getVehicleByIdService = async (id: string) => {
  return await prisma.vehicle.findUnique({
    where: { id },
    include: {
      model: true,
      Shop: true,
      admin: true,
    },
  });
};

export const updateVehicleService = async (
  id: string,
  {
    registrationNumber,
    modelId,
    shopId,
    perHourCharge,
    fuelType,
    vehicleImg,
  }: {
    registrationNumber?: string;
    modelId?: string;
    shopId?: string;
    perHourCharge?: number;
    fuelType?: 'PETROL' | 'DIESEL' | 'ELECTRIC' | 'HYBRID';
    vehicleImg?: string[];
  }
) => {
  try {
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        registrationNumber,
        model: modelId ? { connect: { id: modelId } } : undefined,
        Shop: shopId ? { connect: { id: shopId } } : undefined,
        perHourCharge,
        fuelType,
        vehicleImg: vehicleImg ? { set: vehicleImg } : undefined,
      },
      include: {
        model: true,
        admin: true,
        Shop: true,
        bookings: true,
      }
    });

    return vehicle;
  } catch (error: any) {
    throw new Error('Error updating vehicle: ' + error.message);
  }
};


export const deleteVehicleService = async (id: string) => {
  return await prisma.vehicle.delete({
    where: { id },
  });
};
