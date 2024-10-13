import { UserRole } from '@prisma/client'; // Adjust according to your setup

declare global {
  namespace Express {
    interface User {
      userId: string;
      role: UserRole;
    }

    interface Request {
      user?: User;  
    }
  }
}

export {};
