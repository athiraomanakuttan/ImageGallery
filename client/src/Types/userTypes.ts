//  form data interface for login
export interface FormData {
  email: string;
  password: string;
}

//  errors interface for form validation
export interface FormErrors {
  email?: string;
  password?: string;
  api?: string;
}