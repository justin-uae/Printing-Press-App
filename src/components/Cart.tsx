import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Trash2, Plus, Minus, ShoppingBag, Package, CreditCard, ArrowRight } from 'lucide-react';
import { closeCart } from '../store/slices/uiSlice';
import {
    removeFromCart,
    updateQuantity,
    clearCart,
    selectCartItems,
    selectCartTotalPrice
} from '../store/slices/cartSlice';
import { createCart, cartItemsToLineInputs } from '../services/shopifyCart';
import CheckoutAuthModal from './CheckoutAuthModal';
import type { RootState } from '../store/store';

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector((state: RootState) => state.ui.isCartOpen);
    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectCartTotalPrice);
    // Get authentication state from Redux
    const { isAuthenticated, customerAccessToken } = useSelector((state: RootState) => state.auth);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    if (!isCartOpen) return null;

    const handleQuantityChange = (itemId: string, newQuantity: number): void => {
        if (newQuantity < 1) return;
        dispatch(updateQuantity({ itemId, quantity: newQuantity }));
    };

    const handleRemoveItem = (itemId: string): void => {
        dispatch(removeFromCart(itemId));
    };

    const handleCheckoutClick = (): void => {
        if (cartItems.length === 0) return;

        // If already authenticated, proceed directly to checkout
        if (isAuthenticated) {
            proceedToCheckout();
        } else {
            // Show authentication modal for guest users
            setShowAuthModal(true);
        }
    };

    const proceedToCheckout = async (): Promise<void> => {
        setIsCheckingOut(true);
        setShowAuthModal(false);

        try {
            // Convert cart items to Shopify cart line inputs
            const lines = cartItemsToLineInputs(cartItems);

            // Create Shopify cart with customer token if available
            const checkoutUrl = await createCart(lines, customerAccessToken || undefined);

            // Redirect to Shopify checkout
            window.location.href = checkoutUrl;
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to create checkout. Please try again.');
            setIsCheckingOut(false);
        }
    };

    const handleGuestCheckout = (): void => {
        proceedToCheckout();
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/60 z-40 transition-opacity backdrop-blur-sm"
                onClick={() => dispatch(closeCart())}
            />

            {/* Cart Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full sm:w-[90%] md:w-[450px] bg-white shadow-2xl z-50 flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-500 text-white p-4 sm:p-6 flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="bg-white/20 p-2 sm:p-2.5 rounded-xl">
                            <ShoppingBag size={20} className="sm:w-6 sm:h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-black">Shopping Cart</h2>
                            <p className="text-xs sm:text-sm font-medium">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => dispatch(closeCart())}
                        className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300"
                    >
                        <X size={20} className="sm:w-6 sm:h-6" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center px-4">
                            <div className="bg-gradient-to-br from-orange-100 to-yellow-100 p-6 sm:p-8 rounded-full mb-4 sm:mb-6">
                                <ShoppingBag size={48} className="sm:w-16 sm:h-16 text-orange-500" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 sm:mb-3">Your cart is empty</h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-xs font-medium">Add some products to get started!</p>
                            <button
                                onClick={() => dispatch(closeCart())}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white font-black py-3 px-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
                            >
                                Continue Shopping
                                <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3 sm:space-y-4">
                            {cartItems?.map((item) => {
                                const price = item.selectedOptions.priceType === 'online'
                                    ? item.variant.price
                                    : item.variant.compareAtPrice || item.variant.price;
                                const itemTotal = price * item.quantity;

                                return (
                                    <div key={item.id} className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300">
                                        <div className="flex gap-3 sm:gap-4">
                                            {/* Product Image */}
                                            <div className="relative flex-shrink-0">
                                                <img
                                                    src={item.product.images[0]}
                                                    alt={item.product.title}
                                                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg sm:rounded-xl"
                                                />
                                                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-orange-500 to-orange-500 text-white text-xs font-black w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-lg">
                                                    {item.quantity}
                                                </div>
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between gap-2 mb-2">
                                                    <h4 className="font-black text-gray-900 text-sm sm:text-base line-clamp-2 leading-tight">
                                                        {item.product.title}
                                                    </h4>
                                                    {/* Remove Button - Mobile */}
                                                    <button
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all flex-shrink-0 md:hidden"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-gray-600 mb-2 font-medium line-clamp-1">
                                                    {item.variant.title}
                                                </p>
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="text-base sm:text-lg font-black text-orange-600">
                                                        {price.toFixed(2)} AED
                                                    </div>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-1.5 sm:gap-2 bg-gray-100 rounded-lg sm:rounded-xl p-1">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                            className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center hover:bg-orange-50 hover:text-orange-600 transition-all shadow-sm font-bold"
                                                        >
                                                            <Minus size={12} className="sm:w-3.5 sm:h-3.5" />
                                                        </button>
                                                        <span className="w-6 sm:w-8 text-center font-black text-gray-900 text-sm sm:text-base">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center hover:bg-green-50 hover:text-green-600 transition-all shadow-sm font-bold"
                                                        >
                                                            <Plus size={12} className="sm:w-3.5 sm:h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Remove Button - Desktop */}
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="hidden md:block text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all flex-shrink-0"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        {/* Item Total */}
                                        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t flex items-center justify-between">
                                            <span className="text-xs sm:text-sm text-gray-600 font-bold">Item Total:</span>
                                            <span className="text-base sm:text-lg font-black text-gray-900">{itemTotal.toFixed(2)} AED</span>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Clear Cart Button */}
                            {cartItems.length > 0 && (
                                <button
                                    onClick={() => {
                                        dispatch(clearCart());
                                    }}
                                    className="w-full text-xs sm:text-sm text-red-600 hover:text-red-700 font-bold py-2 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    Clear Cart
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer - Checkout */}
                {cartItems.length > 0 && (
                    <div className="border-t-2 bg-white p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-2xl">
                        {/* Order Summary */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-3 sm:p-4">
                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                                <span className="text-sm sm:text-base text-gray-600 font-bold">Subtotal:</span>
                                <span className="text-lg sm:text-xl font-black text-gray-900">{totalPrice.toFixed(2)} AED</span>
                            </div>
                            <div className="border-t-2 border-gray-200 pt-2 sm:pt-3 flex items-center justify-between">
                                <span className="text-base sm:text-lg font-black text-gray-900">Total:</span>
                                <span className="text-xl sm:text-2xl font-black text-orange-600">{totalPrice.toFixed(2)} AED</span>
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <button
                            onClick={handleCheckoutClick}
                            disabled={isCheckingOut}
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white font-black py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isCheckingOut ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <CreditCard size={20} className="sm:w-6 sm:h-6" />
                                    <span>Proceed to Checkout</span>
                                </>
                            )}
                        </button>

                        {/* Continue Shopping */}
                        <button
                            onClick={() => dispatch(closeCart())}
                            className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-black py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 hover:bg-gray-50 flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            <Package size={16} className="sm:w-5 sm:h-5" />
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>

            {/* Checkout Authentication Modal */}
            <CheckoutAuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onGuestCheckout={handleGuestCheckout}
                totalPrice={totalPrice}
            />
        </>
    );
};

export default Cart;