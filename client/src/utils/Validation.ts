import * as Yup from 'yup';

export const RegistrationValidationSchema = Yup.object().shape({
    name: Yup.string()
        .nullable()
        .min(3, "Too Short!")
        .max(40, "Too Long!")
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
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
        .nullable()
        .min(3, "Too Short!")
        .max(40, "Too Long!")
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
    email: Yup.string()
        .nullable()
        .test(
            'is-valid-email',
            'Please enter a valid email',
            value => !value || Yup.string().email().isValidSync(value)
        ),
    phone: Yup.string()
        .nullable()
        .test(
            'is-valid-phone',
            'Phone number must be a valid 10-digit number',
            value => !value || /^[6-9]\d{9}$/.test(value)
        ),
});

export const shopValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(40, 'Too Long!')
        .required('Name is required'),
    address: Yup.string()
        .min(10, 'Address must be at least 3 characters long')
        .required('Shop Address is required'),
    description: Yup.string()
        .required('Shop Description is required'),
});
