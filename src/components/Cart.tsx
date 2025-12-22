import React from 'react';
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
import type { RootState } from '../types';

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector((state: RootState) => state.ui.isCartOpen);
    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectCartTotalPrice);

    if (!isCartOpen) return null;

    const handleQuantityChange = (itemId: number, newQuantity: number): void => {
        if (newQuantity < 1) return;
        dispatch(updateQuantity({ itemId, quantity: newQuantity }));
    };

    const handleRemoveItem = (itemId: number): void => {
        dispatch(removeFromCart(itemId));
    };

    const handleCheckout = (): void => {
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/60 z-40 transition-opacity backdrop-blur-sm"
                onClick={() => dispatch(closeCart())}
            />

            {/* Cart Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-50 flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2.5 rounded-xl">
                            <ShoppingBag size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black">Shopping Cart</h2>
                            <p className="text-sm font-medium">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => dispatch(closeCart())}
                        className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="bg-gradient-to-br from-red-100 to-pink-100 p-8 rounded-full mb-6">
                                <ShoppingBag size={64} className="text-red-500" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-3">Your cart is empty</h3>
                            <p className="text-gray-600 mb-8 max-w-xs font-medium">Add some products to get started!</p>
                            <button
                                onClick={() => dispatch(closeCart())}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-black py-3 px-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
                            >
                                Continue Shopping
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => {
                                const pricing = item.product.pricing.find(
                                    p => p.quantity === item.selectedOptions.quantity &&
                                        p.type === item.selectedOptions.priceType
                                );
                                const itemTotal = pricing ? pricing.price * item.quantity : 0;

                                return (
                                    <div key={item.id} className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                                        <div className="flex gap-4">
                                            {/* Product Image */}
                                            <div className="relative">
                                                <img
                                                    src={item.product.images[0]}
                                                    alt={item.product.title}
                                                    className="w-24 h-24 object-cover rounded-xl"
                                                />
                                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                                                    {item.quantity}
                                                </div>
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1">
                                                <h4 className="font-black text-gray-900 mb-1 line-clamp-2 leading-tight">
                                                    {item.product.title}
                                                </h4>
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-bold">
                                                        {item.selectedOptions.quantity} pcs
                                                    </span>
                                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
                                                        {item.selectedOptions.priceType}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="text-lg font-black text-red-600">
                                                        {pricing?.price} AED
                                                    </div>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                            className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all shadow-sm font-bold"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="w-8 text-center font-black text-gray-900">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-green-50 hover:text-green-600 transition-all shadow-sm font-bold"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        {/* Item Total */}
                                        <div className="mt-4 pt-4 border-t flex items-center justify-between">
                                            <span className="text-sm text-gray-600 font-bold">Item Total:</span>
                                            <span className="text-lg font-black text-gray-900">{itemTotal.toFixed(2)} AED</span>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Clear Cart Button */}
                            {cartItems.length > 0 && (
                                <button
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to clear the cart?')) {
                                            dispatch(clearCart());
                                        }
                                    }}
                                    className="w-full text-sm text-red-600 hover:text-red-700 font-bold py-2 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    Clear Cart
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer - Checkout */}
                {cartItems.length > 0 && (
                    <div className="border-t-2 bg-white p-6 space-y-4 shadow-2xl">
                        {/* Order Summary */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-gray-600 font-bold">Subtotal:</span>
                                <span className="text-xl font-black text-gray-900">{totalPrice.toFixed(2)} AED</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-3 font-medium">
                                <span>Shipping:</span>
                                <span>Calculated at checkout</span>
                            </div>
                            <div className="border-t-2 border-gray-200 pt-3 flex items-center justify-between">
                                <span className="text-lg font-black text-gray-900">Total:</span>
                                <span className="text-2xl font-black text-red-600">{totalPrice.toFixed(2)} AED</span>
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-black py-4 px-6 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                        >
                            <CreditCard size={22} />
                            Proceed to Checkout
                        </button>

                        {/* Continue Shopping */}
                        <button
                            onClick={() => dispatch(closeCart())}
                            className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-black py-3 px-6 rounded-2xl transition-all duration-300 hover:bg-gray-50 flex items-center justify-center gap-2"
                        >
                            <Package size={18} />
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;