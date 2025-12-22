import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    ShoppingCart,
    Check,
    Clock,
    Package,
    Shield,
    ChevronLeft,
    Zap,
    Star
} from 'lucide-react';
import { addToCart } from '../store/slices/cartSlice';
import { getProductById } from '../data/mockData';

type RouteParams = {
    id: string;
};

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<RouteParams>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const product = id ? getProductById(id) : undefined;

    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1000);
    const [priceType, setPriceType] = useState<'normal' | 'online' | 'express'>('online');
    const [turnaroundType, setTurnaroundType] = useState<'normal' | 'express'>('normal');

    useEffect(() => {
        if (!product) {
            navigate('/products');
            return;
        }
        if (product.pricing && product.pricing.length > 0) {
            setQuantity(product.pricing[0].quantity);
        }
    }, [id, product, navigate]);

    if (!product) {
        return null;
    }

    const availableQuantities: number[] = [...new Set(product.pricing.map(p => p.quantity))].sort((a, b) => a - b);

    const getCurrentPrice = (): number => {
        const pricing = product.pricing.find(
            p => p.quantity === quantity && p.type === priceType
        );
        return pricing ? pricing.price : 0;
    };

    const getPricePerUnit = (): number => {
        const pricing = product.pricing.find(
            p => p.quantity === quantity && p.type === priceType
        );
        return pricing ? pricing.pricePerUnit || (pricing.price / quantity) : 0;
    };

    const getNormalPrice = (): number => {
        const pricing = product.pricing.find(
            p => p.quantity === quantity && p.type === 'normal'
        );
        return pricing ? pricing.price : 0;
    };

    const getSavings = (): number => {
        if (priceType === 'online') {
            return getNormalPrice() - getCurrentPrice();
        }
        return 0;
    };

    const handleAddToCart = (): void => {
        dispatch(addToCart({
            product,
            quantity: 1,
            selectedOptions: {
                quantity,
                priceType,
                turnaround: turnaroundType
            }
        }));
        alert('Product added to cart!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link to="/" className="text-gray-600 hover:text-red-600 font-bold transition-colors">Home</Link>
                        <span className="text-gray-400">/</span>
                        <Link to="/products" className="text-gray-600 hover:text-red-600 font-bold transition-colors">Products</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-black truncate">{product.title}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 mb-6 font-bold transition-colors group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Products
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column - Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.title}
                                className="w-full h-96 lg:h-[500px] object-cover"
                            />
                        </div>

                        {/* Thumbnail Images */}
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-3">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`rounded-2xl overflow-hidden transition-all duration-300 ${selectedImage === index
                                            ? 'ring-4 ring-red-500 scale-105'
                                            : 'ring-2 ring-gray-200 hover:ring-gray-300'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.title} ${index + 1}`}
                                            className="w-full h-20 object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Features */}
                        <div className="bg-white rounded-3xl shadow-lg p-6 lg:p-8">
                            <h3 className="text-xl font-black mb-6 flex items-center gap-2 text-gray-900">
                                <Check size={24} className="text-green-500" />
                                Product Features
                            </h3>
                            <ul className="space-y-3">
                                {product.features?.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="bg-green-100 p-1.5 rounded-full mt-0.5 flex-shrink-0">
                                            <Check size={14} className="text-green-600" />
                                        </div>
                                        <span className="text-gray-700 leading-relaxed font-medium text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - Details & Configuration */}
                    <div className="space-y-6">
                        {/* Product Header */}
                        <div>
                            {product.badge && (
                                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-black mb-3 shadow-md">
                                    <Star size={14} />
                                    {product.badge}
                                </span>
                            )}
                            <div className="flex items-center gap-3 text-sm mb-3">
                                <span className="bg-red-100 text-red-600 px-3 py-1.5 rounded-full font-black">{product.code}</span>
                                <span className="text-gray-600 font-bold">{product.subcategory}</span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 leading-tight">
                                {product.title}
                            </h1>
                            <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-medium">{product.description}</p>
                        </div>

                        {/* Price Calculator Card */}
                        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl shadow-xl p-6 lg:p-8">
                            <h3 className="text-xl font-black mb-6 text-gray-900">
                                Configure Your Order
                            </h3>

                            {/* Quantity Selection */}
                            <div className="mb-6">
                                <label className="block text-sm font-black text-gray-700 mb-3">
                                    Select Quantity
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {availableQuantities.map((qty) => (
                                        <button
                                            key={qty}
                                            onClick={() => setQuantity(qty)}
                                            className={`p-3 rounded-2xl font-black transition-all duration-300 text-center ${quantity === qty
                                                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white scale-105 shadow-lg'
                                                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                                                }`}
                                        >
                                            <div className="text-base lg:text-lg">{qty.toLocaleString()}</div>
                                            <div className="text-xs mt-1 opacity-75">pcs</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Type Selection */}
                            <div className="mb-6">
                                <label className="block text-sm font-black text-gray-700 mb-3">
                                    Select Price Type
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setPriceType('online')}
                                        className={`p-4 rounded-2xl transition-all duration-300 text-center ${priceType === 'online'
                                            ? 'bg-gradient-to-r from-green-400 to-teal-500 text-white scale-105 shadow-lg'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                                            }`}
                                    >
                                        <div className="font-black mb-1 text-sm lg:text-base">Online Price</div>
                                        <div className="text-xs opacity-75">Best Value!</div>
                                    </button>
                                    <button
                                        onClick={() => setPriceType('normal')}
                                        className={`p-4 rounded-2xl transition-all duration-300 text-center ${priceType === 'normal'
                                            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white scale-105 shadow-lg'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                                            }`}
                                    >
                                        <div className="font-black mb-1 text-sm lg:text-base">Normal Price</div>
                                        <div className="text-xs opacity-75">Standard</div>
                                    </button>
                                </div>
                            </div>

                            {/* Express Option */}
                            {product.turnaround.express && (
                                <div className="mb-6">
                                    <label className="block text-sm font-black text-gray-700 mb-3">
                                        Turnaround Time
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => {
                                                setTurnaroundType('normal');
                                                setPriceType('online');
                                            }}
                                            className={`p-4 rounded-2xl transition-all duration-300 text-center ${turnaroundType === 'normal'
                                                ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white scale-105 shadow-lg'
                                                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                                                }`}
                                        >
                                            <div className="font-black mb-1 text-sm lg:text-base">Normal</div>
                                            <div className="text-xs opacity-75">{product.turnaround.normal}</div>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setTurnaroundType('express');
                                                setPriceType('express');
                                            }}
                                            className={`p-4 rounded-2xl transition-all duration-300 text-center ${turnaroundType === 'express'
                                                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white scale-105 shadow-lg'
                                                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                                                }`}
                                        >
                                            <div className="flex items-center justify-center gap-1 font-black mb-1 text-sm lg:text-base">
                                                <Zap size={14} />
                                                Express
                                            </div>
                                            <div className="text-xs opacity-75">{product.turnaround.express}</div>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Price Display */}
                            <div className="bg-white rounded-2xl p-5 lg:p-6 mb-6 shadow-md">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                    <div>
                                        <div className="text-xs text-gray-600 mb-2 font-bold uppercase">Total Price</div>
                                        <div className="text-3xl lg:text-4xl font-black text-red-600">
                                            {getCurrentPrice()}<span className="text-lg lg:text-2xl ml-1">AED</span>
                                        </div>
                                    </div>
                                    {getSavings() > 0 && (
                                        <div className="text-left sm:text-right">
                                            <div className="text-sm text-gray-500 line-through mb-1 font-medium">
                                                {getNormalPrice()} AED
                                            </div>
                                            <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-black">
                                                💰 Save {getSavings()} AED!
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600 pt-4 border-t font-medium">
                                    Price per unit: <span className="text-red-600 font-black">{getPricePerUnit().toFixed(3)} AED</span>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-black py-4 px-6 rounded-2xl text-base lg:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                            >
                                <ShoppingCart size={22} />
                                Add to Cart
                            </button>

                            {/* Additional Info */}
                            <div className="mt-6 space-y-2">
                                <div className="flex items-center gap-3 text-xs sm:text-sm font-bold bg-white px-4 py-3 rounded-xl">
                                    <Clock size={16} className="text-blue-600 flex-shrink-0" />
                                    <span className="text-gray-700">Delivery: {turnaroundType === 'express' ? product.turnaround.express : product.turnaround.normal}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs sm:text-sm font-bold bg-white px-4 py-3 rounded-xl">
                                    <Package size={16} className="text-purple-600 flex-shrink-0" />
                                    <span className="text-gray-700">Min order: {availableQuantities[0]} pcs</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs sm:text-sm font-bold bg-white px-4 py-3 rounded-xl">
                                    <Shield size={16} className="text-green-600 flex-shrink-0" />
                                    <span className="text-gray-700">Quality Guaranteed</span>
                                </div>
                            </div>
                        </div>

                        {/* Specifications */}
                        <div className="bg-white rounded-3xl shadow-lg p-6 lg:p-8">
                            <h3 className="text-xl font-black mb-6 text-gray-900">Specifications</h3>
                            <div className="grid grid-cols-2 gap-3 lg:gap-4">
                                <div className="bg-gray-50 p-3 lg:p-4 rounded-2xl">
                                    <div className="text-xs text-gray-500 mb-1 font-bold uppercase">Colors</div>
                                    <div className="font-black text-gray-900 text-sm lg:text-base">{product.specifications.colors} Color</div>
                                </div>
                                <div className="bg-gray-50 p-3 lg:p-4 rounded-2xl">
                                    <div className="text-xs text-gray-500 mb-1 font-bold uppercase">Sides</div>
                                    <div className="font-black text-gray-900 text-sm lg:text-base">{product.specifications.sides} Side(s)</div>
                                </div>
                                <div className="bg-gray-50 p-3 lg:p-4 rounded-2xl">
                                    <div className="text-xs text-gray-500 mb-1 font-bold uppercase">Material</div>
                                    <div className="font-black text-gray-900 text-xs lg:text-sm">{product.specifications.material}</div>
                                </div>
                                <div className="bg-gray-50 p-3 lg:p-4 rounded-2xl">
                                    <div className="text-xs text-gray-500 mb-1 font-bold uppercase">Before Cut</div>
                                    <div className="font-black text-gray-900 text-sm lg:text-base">{product.specifications.beforeCutting}</div>
                                </div>
                                <div className="bg-gray-50 p-3 lg:p-4 rounded-2xl">
                                    <div className="text-xs text-gray-500 mb-1 font-bold uppercase">After Cut</div>
                                    <div className="font-black text-gray-900 text-sm lg:text-base">{product.specifications.afterCutting}</div>
                                </div>
                                <div className="bg-gray-50 p-3 lg:p-4 rounded-2xl">
                                    <div className="text-xs text-gray-500 mb-1 font-bold uppercase">Finishes</div>
                                    <div className="font-black text-gray-900 text-xs lg:text-sm">{product.specifications.finishes.join(', ')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Price Table */}
                <div className="mt-12 bg-white rounded-3xl shadow-lg p-6 lg:p-8">
                    <h3 className="text-2xl lg:text-3xl font-black mb-6 text-gray-900">Pricing Table</h3>
                    <div className="overflow-x-auto -mx-6 lg:mx-0">
                        <div className="inline-block min-w-full align-middle px-6 lg:px-0">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b-2 border-gray-200 bg-gray-50">
                                        <th className="text-left py-4 px-3 lg:px-4 font-black text-gray-900 text-sm lg:text-base">Quantity</th>
                                        <th className="text-right py-4 px-3 lg:px-4 font-black text-gray-900 text-sm lg:text-base whitespace-nowrap">Normal</th>
                                        <th className="text-right py-4 px-3 lg:px-4 font-black text-green-600 text-sm lg:text-base whitespace-nowrap">Online</th>
                                        {product.turnaround.express && (
                                            <th className="text-right py-4 px-3 lg:px-4 font-black text-orange-600 text-sm lg:text-base whitespace-nowrap">Express</th>
                                        )}
                                        <th className="text-right py-4 px-3 lg:px-4 font-black text-gray-900 text-sm lg:text-base whitespace-nowrap">Per Unit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {availableQuantities.map((qty, index) => {
                                        const normalPrice = product.pricing.find(p => p.quantity === qty && p.type === 'normal');
                                        const onlinePrice = product.pricing.find(p => p.quantity === qty && p.type === 'online');
                                        const expressPrice = product.pricing.find(p => p.quantity === qty && p.type === 'express');

                                        return (
                                            <tr key={qty} className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                                                <td className="py-3 lg:py-4 px-3 lg:px-4 font-black text-gray-900 text-sm lg:text-base whitespace-nowrap">{qty.toLocaleString()} pcs</td>
                                                <td className="py-3 lg:py-4 px-3 lg:px-4 text-right text-gray-600 font-bold text-sm lg:text-base whitespace-nowrap">{normalPrice?.price || '-'} AED</td>
                                                <td className="py-3 lg:py-4 px-3 lg:px-4 text-right text-green-600 font-black text-sm lg:text-base whitespace-nowrap">
                                                    {onlinePrice?.price || '-'} AED
                                                </td>
                                                {product.turnaround.express && (
                                                    <td className="py-3 lg:py-4 px-3 lg:px-4 text-right text-orange-600 font-black text-sm lg:text-base whitespace-nowrap">
                                                        {expressPrice?.price || '-'} AED
                                                    </td>
                                                )}
                                                <td className="py-3 lg:py-4 px-3 lg:px-4 text-right text-xs lg:text-sm text-gray-600 font-bold whitespace-nowrap">
                                                    {onlinePrice ? (onlinePrice.price / qty).toFixed(3) : '-'} AED
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;