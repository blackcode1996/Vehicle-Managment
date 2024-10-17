import express from 'express';
import { createVehicle, getAllVehicles, getVehicleById, updateVehicle, deleteVehicle } from '../controllers/vehilceController';
import { authenticate, authorizeRole } from '../middlewares/validateAuthenticated';
import { upload } from '../utlis/multerConfig';

const router = express.Router();


router.post('/', authenticate, authorizeRole(['ADMIN', 'SUPER_ADMIN']), upload.array('vehicleImg'), createVehicle);
router.get('/', getAllVehicles);
router.get('/:id', getVehicleById);
router.put('/:id', authenticate, authorizeRole(['ADMIN', 'SUPER_ADMIN']), upload.array('vehicleImg'), updateVehicle);
router.delete('/:id', authenticate, authorizeRole(['ADMIN', 'SUPER_ADMIN']), deleteVehicle);

export default router;
