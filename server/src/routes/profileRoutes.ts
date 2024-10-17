import { Router } from 'express';
import { deleteProfile, getAllProfiles, getProfile, resetPassword, updateProfile } from '../controllers/profileController';
import { authenticate, authorizeRole } from '../middlewares/validateAuthenticated';
import { resetPasswordValidationRules } from '../utlis/validations/authValidations';

const router = Router();

router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);
router.get("/profiles/all", authenticate,authorizeRole(["SUPER_ADMIN"]), getAllProfiles);
router.delete("/profile/:id",authenticate,authorizeRole(["SUPER_ADMIN"]), deleteProfile);
router.post('/profile/reset-password', authenticate, resetPasswordValidationRules, resetPassword);

export default router;