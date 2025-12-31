import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Package, Calendar, ArrowLeft, ShoppingBag } from 'lucide-react';
import type { AppDispatch, RootState } from '../store/store';
import { fetchOrders } from '../store/slices/ordersSlice';

const BookingsPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { orders, loading, error } = useSelector((state: RootState) => state.orders);

    const [filter, setFilter] = useState<'all' | 'pending' | 'fulfilled'>('all');

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        // Fetch orders
        dispatch(fetchOrders(50));
    }, [isAuthenticated, dispatch, navigate]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        const statusLower = status?.toLowerCase() || '';
        if (statusLower.includes('fulfilled') || statusLower.includes('paid')) {
            return 'bg-green-100 text-green-700 border-green-200';
        } else if (statusLower.includes('pending') || statusLower.includes('unfulfilled')) {
            return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        } else if (statusLower.includes('cancelled') || statusLower.includes('refunded')) {
            return 'bg-red-100 text-red-700 border-red-200';
        }
        return 'bg-gray-100 text-gray-700 border-gray-200';
    };

    const getStatusIcon = (status: string) => {
        const statusLower = status?.toLowerCase() || '';
        if (statusLower.includes('fulfilled') || statusLower.includes('paid')) {
            return '✓';
        } else if (statusLower.includes('pending') || statusLower.includes('unfulfilled')) {
            return '⏳';
        } else if (statusLower.includes('cancelled') || statusLower.includes('refunded')) {
            return '✕';
        }
        return '📦';
    };

    const filteredOrders = orders.filter(order => {
        if (filter === 'all') return true;
        if (filter === 'pending') return order.status?.toLowerCase().includes('unfulfilled') || order.status?.toLowerCase().includes('pending');
        if (filter === 'fulfilled') return order.status?.toLowerCase().includes('fulfilled');
        return true;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-bold">Loading your orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-orange-500 to-orange-500 text-white py-16 lg:py-20 overflow-hidden">
                <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white opacity-10" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link
                        to="/profile"
                        className="inline-flex items-center gap-2 text-white hover:text-yellow-300 font-bold mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Profile
                    </Link>
                    <div className="text-center">
                        <div className="inline-block bg-white text-orange-600 px-6 py-3 rounded-2xl font-black text-sm mb-6 shadow-lg">
                            ORDER HISTORY
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">My Orders</h1>
                        <p className="text-xl lg:text-2xl max-w-3xl mx-auto font-medium">
                            Track and manage all your printing orders
                        </p>
                    </div>
                </div>
            </section>

            {/* Orders Content */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filter Tabs */}
                    <div className="mb-8 flex flex-wrap gap-3">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-6 py-3 rounded-xl font-black transition-all duration-300 ${filter === 'all'
                                ? 'bg-gradient-to-r from-orange-500 to-orange-500 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                                }`}
                        >
                            All Orders ({orders.length})
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-6 py-3 rounded-xl font-black transition-all duration-300 ${filter === 'pending'
                                ? 'bg-gradient-to-r from-orange-500 to-orange-500 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                                }`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setFilter('fulfilled')}
                            className={`px-6 py-3 rounded-xl font-black transition-all duration-300 ${filter === 'fulfilled'
                                ? 'bg-gradient-to-r from-orange-500 to-orange-500 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                                }`}
                        >
                            Fulfilled
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-8 bg-red-50 border-2 border-red-200 rounded-xl p-6">
                            <p className="text-red-700 font-bold">❌ {error}</p>
                        </div>
                    )}

                    {/* Orders List */}
                    {filteredOrders.length === 0 ? (
                        <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag size={48} className="text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-2">No Orders Found</h3>
                            <p className="text-gray-600 font-medium mb-8">
                                {filter === 'all'
                                    ? "You haven't placed any orders yet"
                                    : `No ${filter} orders found`
                                }
                            </p>
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white font-black py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <ShoppingBag size={20} />
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    {/* Order Header */}
                                    <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b-2 border-gray-100">
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-black text-gray-900">
                                                        Order #{order.orderNumber}
                                                    </h3>
                                                    <span className={`px-3 py-1 rounded-lg text-xs font-black border-2 ${getStatusColor(order.status)}`}>
                                                        {getStatusIcon(order.status)} {order.status || 'Pending'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600 font-medium">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={16} />
                                                        {formatDate(order.date)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Package size={16} />
                                                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600 font-bold mb-1">Total Amount</p>
                                                <p className="text-2xl font-black text-orange-600">
                                                    {order.currencyCode} {order.total.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="p-6">
                                        <div className="space-y-4">
                                            {order.items.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                                                >
                                                    {item.image && (
                                                        <img
                                                            src={item.image}
                                                            alt={item.title}
                                                            className="w-20 h-20 object-cover rounded-xl"
                                                        />
                                                    )}
                                                    <div className="flex-1">
                                                        <h4 className="font-black text-gray-900 mb-1">{item.title}</h4>
                                                        <p className="text-sm text-gray-600 font-medium">
                                                            Quantity: {item.quantity} × {order.currencyCode} {item.price.toFixed(2)}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-black text-gray-900">
                                                            {order.currencyCode} {(item.quantity * item.price).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Order Summary */}
                                        <div className="mt-6 pt-6 border-t-2 border-gray-100">
                                            <div className="space-y-2 max-w-sm ml-auto">
                                                <div className="flex justify-between text-sm font-medium text-gray-600">
                                                    <span>Subtotal:</span>
                                                    <span>{order.currencyCode} {order.subtotal.toFixed(2)}</span>
                                                </div>
                                                {order.tax > 0 && (
                                                    <div className="flex justify-between text-sm font-medium text-gray-600">
                                                        <span>Tax:</span>
                                                        <span>{order.currencyCode} {order.tax.toFixed(2)}</span>
                                                    </div>
                                                )}
                                                {order.shipping > 0 && (
                                                    <div className="flex justify-between text-sm font-medium text-gray-600">
                                                        <span>Shipping:</span>
                                                        <span>{order.currencyCode} {order.shipping.toFixed(2)}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between text-lg font-black text-gray-900 pt-2 border-t-2 border-gray-200">
                                                    <span>Total:</span>
                                                    <span className="text-orange-600">{order.currencyCode} {order.total.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Help Section */}
                    {filteredOrders.length > 0 && (
                        <div className="mt-12 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl shadow-lg p-8 text-center">
                            <h3 className="text-2xl font-black text-gray-900 mb-2">Need Help?</h3>
                            <p className="text-gray-600 font-medium mb-6">
                                Have questions about your order? Our support team is here to help!
                            </p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white font-black py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Contact Support
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BookingsPage;