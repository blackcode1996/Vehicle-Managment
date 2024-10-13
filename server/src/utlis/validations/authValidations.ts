import { body } from 'express-validator';

export const registerValidationRules = [
  body('name')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),

  body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character'),
];

export const loginValidationRules = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

export const resetPasswordValidationRules = [
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character'),

];