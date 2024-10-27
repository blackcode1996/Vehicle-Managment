import petrolIcon from "../assets/petrol.png";
import dieselIcon from "../assets/diesel.png";
import electricIcon from "../assets/eletric.png";
import hybridIcon from "../assets/hybrid.png";

enum FuelType {
    PETROL = "PETROL",
    DIESEL = "DIESEL",
    ELECTRIC = "ELECTRIC",
    HYBRID = "HYBRID",
}


const fuelTypeImages = {
    [FuelType.PETROL]: petrolIcon,
    [FuelType.DIESEL]: dieselIcon,
    [FuelType.ELECTRIC]: electricIcon,
    [FuelType.HYBRID]: hybridIcon,
};

export const fuelTypeOptions = Object.values(FuelType).map((fuel) => ({
    id: fuel,
    name: fuel,
    image: fuelTypeImages[fuel],
}));