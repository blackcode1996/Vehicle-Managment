import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadSingleImage = async (fileBuffer: Buffer): Promise<string | null> => {
    try {
        const result = await new Promise<any>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(fileBuffer);
        });

        return result.secure_url;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const uploadMultipleImages = async (files: Buffer[]): Promise<any[]> => {
    try {
        const uploadPromises = files.map((fileBuffer) => {
            return new Promise<any>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: 'auto' },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                stream.end(fileBuffer);
            });
        });

        const results = await Promise.all(uploadPromises);
        return results;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

