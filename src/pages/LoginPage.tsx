import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';
import { loginUser, clearError } from '../store/slices/authSlice';
import Logo from '../assets/Logo.png';
import type { AppDispatch, RootState } from '../store/store';

interface LoginFormData {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (error) {
            dispatch(clearError());
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const result = await dispatch(loginUser({
            email: formData.email,
            password: formData.password
        }));

        if (loginUser.fulfilled.match(result)) {
            navigate('/profile');
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
                        WELCOME BACK
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">Login to Your Account</h1>
                    <p className="text-xl lg:text-2xl max-w-3xl mx-auto font-medium">
                        Access your bookings and manage your orders
                    </p>
                </div>
            </section>

            {/* Login Form Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-10">
                        <div className="mb-8 text-center">
                            <div className="w-16 h-16  rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <img
                                    src={Logo}
                                    alt="DBX Print & Design Logo"
                                    className="h-8 sm:h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 mb-2">Sign In</h2>
                            <p className="text-gray-600 font-medium">Enter your credentials to continue</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                        disabled={loading}
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
                                        disabled={loading}
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
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                                    <p className="text-red-700 font-bold text-sm">
                                        ❌ {error}
                                    </p>
                                </div>
                            )}

                            {/* Forgot Password Link */}
                            <div className="text-right">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white font-black py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Signing In...
                                    </>
                                ) : (
                                    <>
                                        <LogIn size={20} />
                                        Sign In
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Register Link */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-600 font-medium">
                                Don't have an account?{' '}
                                <Link
                                    to="/register"
                                    className="text-orange-600 hover:text-orange-700 font-black transition-colors inline-flex items-center gap-1"
                                >
                                    Create Account
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

export default LoginPage;