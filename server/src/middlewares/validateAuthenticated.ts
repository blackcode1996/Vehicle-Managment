import { UserRole } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string; id: string; role: string
    };
    req.user = {
      userId: decoded.userId,
      role: decoded.role as UserRole
    };
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !('role' in req.user) || !roles.includes(req.user.role as string)) {
      console.log("role", req?.user)
      return res.status(403).json({ error: 'Access denied: insufficient role' });
    }
    next();
  };
};

