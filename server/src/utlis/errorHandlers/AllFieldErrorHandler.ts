export const validateRequiredFields = (requiredFields: string[], data: any) => {
    const missingFields = requiredFields.filter(field => {
        const value = data[field];

        if (typeof value === 'string') {
            return !value.trim();
        } else {
            return value === undefined || value === null;
        }
    });

    if (missingFields.length > 0) {
        const error = new Error(`Missing or empty required fields: ${missingFields.join(', ')}`);
        error.name = 'ValidationError';
        throw error;
    }
};
