export const generateMapURL = (coordinates: [number, number]) => {
    return `https://maps.google.com/maps?q=&t=&z=13&ie=UTF8&iwloc=&output=embed&daddr=${coordinates[0]},${coordinates[1]}`;
};

export const handleAddressClick = (_address: string, location: [number, number]) => {
    const mapURL = generateMapURL(location);
    window.open(mapURL, "_blank");
};