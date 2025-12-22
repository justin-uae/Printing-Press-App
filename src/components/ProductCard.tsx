import React from 'react';
import { Link } from 'react-router-dom';
import { getLowestOnlinePrice, getLowestNormalPrice, calculateSavings } from '../utils/transformers';
import type { ProductCardProps } from '..';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const lowestPrice = getLowestOnlinePrice(product.pricing);
    const normalPrice = getLowestNormalPrice(product.pricing);
    const discount = product.discount || calculateSavings(lowestPrice, normalPrice);

    return (
        <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 border-4 border-gray-300">
            {/* Image Container */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <Link to={`/product/${product.handle}`}>
                    <img
                        src={product.images[0] || '/placeholder.jpg'}
                        alt={product.title}
                        className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                </Link>

                {/* Badge and Discount */}
                <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                    {/* Product Badge */}
                    {product.badge && (
                        <div className={`px-3 py-1.5 rounded-xl font-black text-xs shadow-lg border-2 border-gray-900 ${product.badge === 'POPULAR' ? 'bg-blue-400 text-white' :
                            product.badge === 'NEW' ? 'bg-green-400 text-white' :
                                product.badge === 'BESTSELLER' ? 'bg-yellow-400 text-gray-900' :
                                    product.badge === 'HOT' ? 'bg-red-400 text-white' :
                                        product.badge === 'PREMIUM' ? 'bg-purple-400 text-white' :
                                            product.badge === 'ECO-FRIENDLY' ? 'bg-green-500 text-white' :
                                                product.badge === 'BUDGET' ? 'bg-orange-400 text-white' :
                                                    'bg-gray-400 text-white'
                            }`}>
                            {product.badge}
                        </div>
                    )}

                    {/* Discount Badge */}
                    {discount > 0 && (
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-xl font-black text-sm shadow-lg border-2 border-gray-900">
                            -{discount}%
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Category Tag */}
                {product.category && (
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        {product.category.replace(/-/g, ' ')}
                    </div>
                )}

                {/* Title */}
                <Link to={`/product/${product.handle}`}>
                    <h3 className="text-xl font-black text-gray-900 mb-3 hover:text-red-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                        {product.title}
                    </h3>
                </Link>

                {/* Pricing */}
                <div className="mb-5">
                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-black text-red-600">
                            {lowestPrice} <span className="text-lg">AED</span>
                        </span>
                        {discount > 0 && normalPrice > lowestPrice && (
                            <span className="text-sm text-gray-400 line-through font-medium">
                                {normalPrice} AED
                            </span>
                        )}
                    </div>
                </div>
                {/* Action Button */}
                <Link
                    to={`/product/${product.handle}`}
                    className="block w-full text-center bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-black py-3.5 px-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 border-3 border-gray-900"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;