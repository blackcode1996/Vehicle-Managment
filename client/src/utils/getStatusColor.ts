export const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-middle";
    case "COMPLETED":
      return "bg-primary";
    case "CANCELLED":
      return "bg-secondary";
    case "ACCEPTED":
      return 'bg-green';
    case "DECLINED":
      return "bg-secondary";
    default:
      return "bg-neutral";
  }
};
