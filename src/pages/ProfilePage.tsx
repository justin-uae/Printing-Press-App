import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { User, Mail, Calendar, LogOut, Package, ShieldCheck } from 'lucide-react';
import { logoutUser, fetchCustomerData } from '../store/slices/authSlice';
import type { AppDispatch, RootState } from '../store/store';

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { isAuthenticated, customerData, loading, error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        // Fetch customer data if not already loaded
        if (!customerData) {
            dispatch(fetchCustomerData());
        }
    }, [isAuthenticated, customerData, dispatch, navigate]);

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate('/');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-bold">Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
                <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md mx-4">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">❌</span>
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2">Error</h2>
                        <p className="text-gray-600 font-medium mb-6">{error}</p>
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-500 text-white font-black py-3 px-6 rounded-xl hover:from-orange-600 hover:to-orange-600 transition-all duration-300"
                        >
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!customerData) {
        return null;
    }

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
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
                        {customerData.displayName || `${customerData.firstName} ${customerData.lastName}`}
                    </h1>
                    <p className="text-xl lg:text-2xl max-w-3xl mx-auto font-medium">
                        Manage your account and view your printing orders
                    </p>
                </div>
            </section>

            {/* Profile Content */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Profile Info Card */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Main Profile Card */}
                            <div className="bg-white rounded-3xl shadow-lg p-8">
                                <div className="text-center mb-6">
                                    <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                                        <User size={48} className="text-white" />
                                    </div>
                                    <h2 className="text-2xl font-black text-gray-900 mb-2">
                                        {customerData.firstName} {customerData.lastName}
                                    </h2>
                                    <p className="text-gray-600 font-medium">{customerData.email}</p>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Mail size={20} className="text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-bold text-gray-500">Email</p>
                                            <p className="text-sm font-black text-gray-900">{customerData.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <Calendar size={20} className="text-green-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-bold text-gray-500">Member Since</p>
                                            <p className="text-sm font-black text-gray-900">
                                                {customerData.createdAt ? formatDate(customerData.createdAt) : 'N/A'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <ShieldCheck size={20} className="text-purple-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-bold text-gray-500">Account Status</p>
                                            <p className="text-sm font-black text-green-600">Active</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-black py-3 px-6 rounded-xl transition-all duration-300 border-2 border-red-200"
                                >
                                    <LogOut size={20} />
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="lg:col-span-2">
                            <div className="mb-8">
                                <h2 className="text-3xl font-black text-gray-900 mb-2">Quick Actions</h2>
                                <p className="text-gray-600 font-medium">Manage your account and orders</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Orders Card */}
                                <Link
                                    to="/bookings"
                                    className="group bg-white rounded-3xl shadow-lg hover:shadow-xl p-8 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                                        <Package size={32} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 mb-2">My Orders</h3>
                                    <p className="text-gray-600 font-medium mb-4">
                                        View and track all your printing orders
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-orange-600 font-black text-sm group-hover:gap-3 transition-all">
                                        View Orders
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </span>
                                </Link>

                                {/* Support Card */}
                                <Link
                                    to="/contact"
                                    className="group bg-white rounded-3xl shadow-lg hover:shadow-xl p-8 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                                        <span className="text-3xl">💬</span>
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 mb-2">Get Support</h3>
                                    <p className="text-gray-600 font-medium mb-4">
                                        Contact our support team
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-orange-600 font-black text-sm group-hover:gap-3 transition-all">
                                        Contact Us
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProfilePage;