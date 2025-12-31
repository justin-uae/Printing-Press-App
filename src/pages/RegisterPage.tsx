import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, UserPlus, ArrowRight, CheckCircle } from 'lucide-react';
import { customerLogin, customerRegister } from '../services/shopify';
import Logo from '../assets/Logo.png'

interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterFormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Check password strength
        if (name === 'password') {
            checkPasswordStrength(value);
        }

        // Clear error when user starts typing
        if (errorMessage) {
            setErrorMessage('');
            setFormStatus('idle');
        }
    };

    const checkPasswordStrength = (password: string): void => {
        if (password.length < 6) {
            setPasswordStrength('weak');
        } else if (password.length < 10) {
            setPasswordStrength('medium');
        } else {
            setPasswordStrength('strong');
        }
    };

    const validateForm = (): boolean => {
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match');
            setFormStatus('error');
            return false;
        }

        if (formData.password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long');
            setFormStatus('error');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setFormStatus('loading');
        setErrorMessage('');

        try {
            // Register the customer
            await customerRegister(
                formData.email,
                formData.password,
                formData.firstName,
                formData.lastName
            );

            // Automatically log them in
            const result = await customerLogin(formData.email, formData.password);

            // Store access token in localStorage
            localStorage.setItem('customerAccessToken', result.accessToken);
            localStorage.setItem('customerAccessTokenExpiry', result.expiresAt);

            // Redirect to profile page
            navigate('/profile');
        } catch (error) {
            console.error('Registration error:', error);
            setFormStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Registration failed. Please try again.');
        }
    };

    const getPasswordStrengthColor = () => {
        switch (passwordStrength) {
            case 'weak': return 'bg-red-500';
            case 'medium': return 'bg-yellow-500';
            case 'strong': return 'bg-green-500';
            default: return 'bg-gray-300';
        }
    };

    const getPasswordStrengthWidth = () => {
        switch (passwordStrength) {
            case 'weak': return 'w-1/3';
            case 'medium': return 'w-2/3';
            case 'strong': return 'w-full';
            default: return 'w-0';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-orange-500 to-orange-500 text-white py-16 lg:py-20 overflow-hidden">
                <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white opacity-10" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-block bg-white text-orange-600 px-6 py-3 rounded-2xl font-black text-sm mb-6 shadow-lg">
                        JOIN US TODAY
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">Create Your Account</h1>
                    <p className="text-xl lg:text-2xl max-w-3xl mx-auto font-medium">
                        Start your journey with premium printing services
                    </p>
                </div>
            </section>

            {/* Register Form Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-10">
                        <div className="mb-8 text-center">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <img
                                    src={Logo}
                                    alt="DBX Print & Design Logo"
                                    className="h-8 sm:h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 mb-2">Sign Up</h2>
                            <p className="text-gray-600 font-medium">Fill in your details to get started</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-black text-gray-700 mb-2">
                                        First Name *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User size={20} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            disabled={formStatus === 'loading'}
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            placeholder="John"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-black text-gray-700 mb-2">
                                        Last Name *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User size={20} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            disabled={formStatus === 'loading'}
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-black text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail size={20} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={formStatus === 'loading'}
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-black text-gray-700 mb-2">
                                    Password *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock size={20} className="text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        disabled={formStatus === 'loading'}
                                        className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {/* Password Strength Indicator */}
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-300 ${getPasswordStrengthColor()} ${getPasswordStrengthWidth()}`}
                                            ></div>
                                        </div>
                                        <p className="text-xs font-medium text-gray-600 mt-1 capitalize">
                                            Password strength: {passwordStrength}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-black text-gray-700 mb-2">
                                    Confirm Password *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock size={20} className="text-gray-400" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        disabled={formStatus === 'loading'}
                                        className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <CheckCircle size={16} className="text-green-600" />
                                        <p className="text-xs font-bold text-green-600">Passwords match</p>
                                    </div>
                                )}
                            </div>

                            {/* Error Message */}
                            {formStatus === 'error' && errorMessage && (
                                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                                    <p className="text-red-700 font-bold text-sm">
                                        ❌ {errorMessage}
                                    </p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={formStatus === 'loading'}
                                className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white font-black py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {formStatus === 'loading' ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus size={20} />
                                        Create Account
                                    </>
                                )}
                            </button>

                            {/* Terms */}
                            <p className="text-xs text-gray-600 text-center font-medium">
                                By creating an account, you agree to our{' '}
                                <Link to="/terms" className="text-orange-600 hover:text-orange-700 font-bold">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link to="/privacy" className="text-orange-600 hover:text-orange-700 font-bold">
                                    Privacy Policy
                                </Link>
                            </p>
                        </form>

                        {/* Login Link */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-600 font-medium">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="text-orange-600 hover:text-orange-700 font-black transition-colors inline-flex items-center gap-1"
                                >
                                    Sign In
                                    <ArrowRight size={16} />
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegisterPage;