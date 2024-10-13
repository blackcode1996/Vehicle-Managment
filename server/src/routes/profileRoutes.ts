import { Router } from 'express';
import { deleteProfile, getAllProfiles, getProfile, resetPassword, updateProfile } from '../controllers/profileController';
import { authenticate } from '../middlewares/validateAuthenticated';
import { resetPasswordValidationRules } from '../utlis/validations/authValidations';

const router = Router();

router.get("/profile", authenticate, getProfile);
router.put("/profile/:targetUserId?", authenticate, updateProfile);
router.get("/profiles", authenticate, getAllProfiles);
router.delete("/profile/:id", authenticate, deleteProfile);
router.post('/profile/:id/reset-password', authenticate, resetPasswordValidationRules, resetPassword);

export default router;