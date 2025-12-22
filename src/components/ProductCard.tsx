import React from 'react';
import { Link } from 'react-router-dom';
import type { ProductCardProps } from '../types';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    const getLowestPrice = (): number => {
        const onlinePrices = product.pricing.filter(p => p.type === 'online');
        return Math.min(...onlinePrices.map(p => p.price));
    };

    const getNormalPrice = (): number => {
        const normalPrices = product.pricing.filter(p => p.type === 'normal');
        return Math.min(...normalPrices.map(p => p.price));
    };

    const lowestPrice = getLowestPrice();
    const normalPrice = getNormalPrice();
    const discount = product.discount || Math.round(((normalPrice - lowestPrice) / normalPrice) * 100);

    return (
        <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-50">
                <Link to={`/product/${product.id}`}>
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                </Link>

                {/* Discount Badge Only */}
                {discount > 0 && (
                    <div className="absolute top-4 right-4">
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-2xl font-black shadow-lg">
                            -{discount}%
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Title */}
                <Link to={`/product/${product.id}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-red-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                        {product.title}
                    </h3>
                </Link>

                {/* Pricing */}
                <div className="mb-5">
                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-black text-red-600">
                            {lowestPrice} <span className="text-lg">AED</span>
                        </span>
                        {discount > 0 && (
                            <span className="text-sm text-gray-400 line-through font-medium">{normalPrice} AED</span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500 font-medium mt-1">from 1000 pcs</p>
                </div>

                {/* Action Button */}
                <Link
                    to={`/product/${product.id}`}
                    className="block w-full text-center bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3.5 px-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;