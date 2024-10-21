import * as Yup from 'yup';

export const RegistrationValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters long')
        .required('Name is required'),
    email: Yup.string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
});


export const LoginValidationRules = Yup.object().shape({
    email: Yup.string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .required('Password is required'),
})

export const profileValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters long')
        .required('Name is required'),
    email: Yup.string()
        .email('Please enter a valid email')
        .required('Email is required'),
    phone: Yup.string()
        .matches(/^[6-9]\d{9}$/, 'Phone number must be a valid 10-digit number')
        .required('Phone number is required'),
})

export const shopValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters long')
        .required('Name is required'),
    address: Yup.string()
        .min(10, 'Address must be at least 3 characters long')
        .required('Shop Address is required'),
    description: Yup.string()
        .required('Shop Description is required'),
});
