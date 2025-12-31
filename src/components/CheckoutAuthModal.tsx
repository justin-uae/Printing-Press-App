import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserX, X, ShoppingBag } from 'lucide-react';
import { closeCart } from '../store/slices/uiSlice';
import { useDispatch } from 'react-redux';

interface CheckoutAuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGuestCheckout: () => void;
    totalPrice: number;
}

const CheckoutAuthModal: React.FC<CheckoutAuthModalProps> = ({
    isOpen,
    onClose,
    onGuestCheckout,
    totalPrice
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (!isOpen) return null;

    const handleLogin = () => {
        onClose();
        dispatch(closeCart())

        navigate('/login', { state: { from: 'checkout' } });
    };

    const handleRegister = () => {
        onClose();
        dispatch(closeCart())
        navigate('/register', { state: { from: 'checkout' } });
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/70 z-[60] transition-opacity backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-500 text-white p-6 relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-xl transition-all duration-300"
                        >
                            <X size={20} />
                        </button>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-white/20 p-3 rounded-xl">
                                <ShoppingBag size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black">Ready to Checkout?</h2>
                                <p className="text-sm font-medium opacity-90">Choose how to continue</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Order Summary */}
                        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-4 border-2 border-orange-200">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700 font-bold">Order Total:</span>
                                <span className="text-2xl font-black text-orange-600">{totalPrice.toFixed(2)} AED</span>
                            </div>
                        </div>

                        {/* Login Option */}
                        <button
                            onClick={handleLogin}
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white font-black py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                        >
                            <User size={22} />
                            <span>Login to Existing Account</span>
                        </button>

                        {/* Register Option */}
                        <button
                            onClick={handleRegister}
                            className="w-full bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-black py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-md flex items-center justify-center gap-3"
                        >
                            <User size={22} />
                            <span>Create New Account</span>
                        </button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 font-bold">OR</span>
                            </div>
                        </div>

                        {/* Guest Checkout Option */}
                        <button
                            onClick={onGuestCheckout}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-black py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 border-2 border-gray-300"
                        >
                            <UserX size={22} />
                            <span>Continue as Guest</span>
                        </button>

                        {/* Guest Warning */}
                        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-3">
                            <p className="text-xs text-yellow-800 font-bold text-center">
                                Guest checkout: You won't be able to track your order without an account
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-scale-in {
                    animation: scale-in 0.2s ease-out;
                }
            `}</style>
        </>
    );
};

export default CheckoutAuthModal;