import axios from "axios";
import dotenv from 'dotenv';

dotenv.config()

export const getAddressFromLocation = async (latitude: number, longitude: number): Promise<string> => {
    try {
        const res = await axios.get(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${process.env.GEOCODE_API_KEY}`)
        if (res && res.data && res.data.display_name) {
            return res.data.display_name;
        } else if (res && res.data && res.data.address) {
            const { road, city, state, country, postcode } = res.data.address;
            const formattedAddress = `${road || ''}, ${city || ''}, ${state || ''}, ${postcode || ''}, ${country || ''}`.trim().replace(/\s*,\s*/g, ', ');
            return formattedAddress;
        } else {
            throw new Error('Address not found for the given coordinates');
        }
    } catch (error: any) {
        throw new Error(`Geocoding error: ${error.message}`);
    }
};
