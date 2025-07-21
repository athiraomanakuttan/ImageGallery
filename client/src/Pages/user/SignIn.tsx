import React, { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { SignIn } from '../../Service/userApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Define form data interface for login
interface FormData {
  email: string;
  password: string;
}

// Define errors interface for form validation
interface FormErrors {
  email?: string;
  password?: string;
  api?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false); // Added state for form validity
  const navigate = useNavigate();

  // Validate form in real-time to enable/disable login button
  useEffect(() => {
    const validateFormForButton = (): boolean => {
      if (!formData.email.trim()) return false;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return false;
      if (!formData.password) return false;
      if (formData.password.length < 8) return false;
      return true;
    };
    setIsFormValid(validateFormForButton());
  }, [formData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await SignIn({
          email: formData.email,
          password: formData.password
        });
        
        if (response.success) {
          toast.success('Login successful!');
          setFormData({
            email: '',
            password: ''
          });
          navigate('/');
        } else {
          const errorData: { message?: string } = await response.json();
          setErrors({ api: errorData.message || 'Login failed' });
        }
      } catch (error) {
        setErrors({ api: 'An error occurred. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="relative bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all hover:shadow-2xl border border-transparent bg-clip-padding">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 tracking-tight">Welcome Back</h2>
        
        {errors.api && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.api}
          </div>
        )}
        
        <div className="space-y-6">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center">
              <svg className="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.email}
              </p>
            )}
          </div>
          
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center">
              <svg className="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2 2 4 2 4m4-4c0-1.104-.896-2-2-2s-2 .896-2 2 2 4 2 4m6-4c0-1.104-.896-2-2-2s-2 .896-2 2 2 4 2 4m-2-10v2m-6 0v2m6 0v2m-10-4v2m0 0c-1.104 0-2 .896-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6c0-1.104-.896-2-2-2" />
              </svg>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.password}
              </p>
            )}
            <p className="mt-2 text-right text-sm text-gray-600">
              <button onClick={() => navigate('/forgot-password')} className="text-blue-500 hover:text-blue-600 font-medium hover:underline" disabled={isLoading}>
                Forgot Password?
              </button>
            </p>
          </div>
          
          <button
            onClick={handleSubmit}
            className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
              !isFormValid || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-700'
            }`}
            disabled={!isFormValid || isLoading} // Disable button if form is invalid or loading
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z" />
              </svg>
            ) : null}
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </div>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <button onClick={() => navigate('/signup')} className="text-blue-500 hover:text-blue-600 font-medium hover:underline" disabled={isLoading}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;