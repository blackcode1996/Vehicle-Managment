import { FuelType, Prisma, PrismaClient } from '@prisma/client';
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
  adminId = null,
  brand,
  model,
  fuelType,
  bookedFrom,
  bookedTo,
}: {
  page: number;
  limit: number;
  search: string;
  sortField: string;
  sortOrder: 'asc' | 'desc';
  adminId?: string | null;
  brand?: string;
  model?: string;
  fuelType?: string;
  bookedFrom?: Date;
  bookedTo?: Date;
}) => {
  const skip = (page - 1) * limit;

  const processedSearch = search ? search.replace(/[^a-zA-Z0-9]/g, '') : '';

  const where: Prisma.VehicleWhereInput = {
    ...(adminId && {
      adminId,
    }),
    ...(fuelType && {
      fuelType: { equals: fuelType as FuelType }, 
    }),
    ...(search && {
      OR: [
        {
          registrationNumber: { contains: search, mode: Prisma.QueryMode.insensitive },
        },
        {
          registrationNumber: { contains: processedSearch, mode: Prisma.QueryMode.insensitive },
        },
        {
          model: {
            name: { contains: search, mode: Prisma.QueryMode.insensitive },
          },
        },
        {
          model: {
            description: { contains: search, mode: Prisma.QueryMode.insensitive },
          },
        },
      ],
    }),
    ...(brand && {
      model: {
        brand: {
          name: { contains: brand, mode: Prisma.QueryMode.insensitive },
        },
      },
    }),
    ...(model && {
      model: {
        name: { contains: model, mode: Prisma.QueryMode.insensitive },
      },
    }),
    bookings: bookedFrom || bookedTo ? {
      some: {
        ...(bookedFrom && { bookedFrom: { gte: bookedFrom } }),
        ...(bookedTo && { bookedTo: { lte: bookedTo } }),
      },
    } : undefined,
  };

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
    const updateData: any = {};

    if (registrationNumber) updateData.registrationNumber = registrationNumber;
    if (modelId) updateData.model = { connect: { id: modelId } };
    if (shopId) updateData.Shop = { connect: { id: shopId } };
    if (perHourCharge) updateData.perHourCharge = perHourCharge;
    if (fuelType) updateData.fuelType = fuelType;

    if (vehicleImg && vehicleImg.length > 0) {
      updateData.vehicleImg = { set: vehicleImg };
    }

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: updateData,
      include: {
        model: true,
        admin: true,
        Shop: true,
        bookings: true,
      },
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
