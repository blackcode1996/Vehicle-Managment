export const formatAddress = (address: string) => {
    return address.split(",").slice(0, 2).join(",");
  };