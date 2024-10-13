import { Router } from 'express';
import { authenticate, authorizeRole } from '../middlewares/validateAuthenticated';
import { createVehicle, updateVehicle, deleteVehicle } from '../controllers/vehilceController';

const router = Router();

// Apply authentication middleware
router.use(authenticate);

// Apply role-based authorization for specific routes
router.post('/vehicles', authorizeRole(["ADMIN", "SUPER_ADMIN"]), createVehicle);
router.put('/vehicles/:id', authorizeRole(["ADMIN", "SUPER_ADMIN"]), updateVehicle);
router.delete('/vehicles/:id', authorizeRole(["ADMIN", "SUPER_ADMIN"]), deleteVehicle);

export default router;
