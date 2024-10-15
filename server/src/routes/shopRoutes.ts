import express from 'express';
import { authenticate, authorizeRole } from '../middlewares/validateAuthenticated';
import {
    createShop,
    getShops,
    updateShop,
    deleteShop
} from '../controllers/shopController';

const router = express.Router();

router.use(authenticate);

// Routes
router.post('/', authenticate, authorizeRole(["ADMIN", "SUPER_ADMIN"]), createShop);
router.get('/', authenticate, authorizeRole(["ADMIN", "SUPER_ADMIN"]), getShops);
router.put('/:id', authenticate,authorizeRole(["ADMIN", "SUPER_ADMIN"]),updateShop);
router.delete('/:id',authenticate,authorizeRole(["ADMIN", "SUPER_ADMIN"]), deleteShop); 

export default router;
