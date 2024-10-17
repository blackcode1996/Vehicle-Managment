import { Router } from 'express';
import { registerUser, loginUser, verifyOTP, resendOTP} from '../controllers/authController';
import { loginValidationRules, registerValidationRules} from '../utlis/validations/authValidations';

const router = Router();

router.post('/register',registerValidationRules, registerUser);
router.post('/verifyotp',verifyOTP);
router.post('/resendotp',resendOTP);
router.post('/login',loginValidationRules, loginUser);


export default router;
