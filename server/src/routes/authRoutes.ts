import { Router } from 'express';
import { registerUser, loginUser, } from '../controllers/authController';
import { loginValidationRules, registerValidationRules } from '../utlis/validations/authValidations';

const router = Router();

// Email and Password Registration and Login
router.post('/register',registerValidationRules, registerUser);
router.post('/login',loginValidationRules, loginUser);


export default router;
