import express from 'express';
import { createBrand, getAllBrands, getBrandById, updateBrand, deleteBrand } from '../controllers/brandController';
import { authenticate, authorizeRole } from '../middlewares/validateAuthenticated';  
import { upload } from '../utlis/multerConfig';

const router = express.Router();

router.post('/', authenticate, authorizeRole(['SUPER_ADMIN']), upload.single('logo'), createBrand);
router.get('/', getAllBrands);
router.get('/:id', getBrandById);
router.put('/:id', authenticate, authorizeRole(['SUPER_ADMIN']), upload.single('logo'),updateBrand);
router.delete('/:id', authenticate, authorizeRole(['SUPER_ADMIN']), deleteBrand);

export default router;
