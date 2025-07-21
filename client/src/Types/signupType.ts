// Define form data interface based on Mongoose model
export interface FormData {
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}

// Define errors interface for form validation
export interface FormErrors {
    username?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    confirmPassword?: string;
    api?: string;
}