import express from 'express';
import { createModel, getAllModels, getModelById, updateModel, deleteModel } from '../controllers/modelController';
import { authenticate, authorizeRole } from '../middlewares/validateAuthenticated';  
import { upload } from '../utlis/multerConfig';

const router = express.Router();


router.post('/', authenticate, authorizeRole(['SUPER_ADMIN']),upload.single('modelImg'), createModel);
router.get('/', getAllModels);
router.get('/:id', getModelById);
router.put('/:id', authenticate, authorizeRole(['SUPER_ADMIN']),upload.single('modelImg'), updateModel);
router.delete('/:id', authenticate, authorizeRole(['SUPER_ADMIN']),upload.single('modelImg'), deleteModel);

export default router;
