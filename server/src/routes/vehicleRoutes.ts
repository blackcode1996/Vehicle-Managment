import { Router } from 'express';
import { authenticate, authorizeRole } from '../middlewares/validateAuthenticated';
import { createVehicle, updateVehicle, deleteVehicle } from '../controllers/vehilceController';

const router = Router();

router.post('/create',authenticate, authorizeRole(["ADMIN", "SUPER_ADMIN"]), createVehicle);
router.put('/vehicles/:id', authorizeRole(["ADMIN", "SUPER_ADMIN"]), updateVehicle);
router.delete('/vehicles/:id', authorizeRole(["ADMIN", "SUPER_ADMIN"]), deleteVehicle);

export default router;
