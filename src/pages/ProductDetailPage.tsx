import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    Check,
    Clock,
    Package,
    Shield,
    ChevronLeft,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProductByHandle } from '../store/productsSlice';
// import { addToCart } from '../store/slices/cartSlice';
// import { openCart } from '../store/slices/uiSlice';
import { getLowestOnlinePrice, getLowestNormalPrice } from '../utils/transformers';
import type { ProductVariant } from '../';

const ProductDetailPage: React.FC = () => {
    const { handle } = useParams<{ handle: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Get product from Redux store
    const { currentProduct: product, loading, error } = useAppSelector(
        (state) => state.products
    );

    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [priceType] = useState<'normal' | 'online'>('online');
    const [turnaroundType] = useState<'normal' | 'express'>('normal');

    // Fetch product on mount or when handle changes
    useEffect(() => {
        if (handle) {
            dispatch(fetchProductByHandle(handle));
        }
    }, [handle, dispatch]);

    // Set initial variant when product loads
    useEffect(() => {
        if (product && product.variants.length > 0 && !selectedVariant) {
            setSelectedVariant(product.variants[0]);
        }
    }, [product]);

    // Handle loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
            </div>
        );
    }

    // Handle error state
    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-black text-gray-900 mb-4">Product Not Found</h2>
                    <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-500 text-white px-6 py-3 rounded-2xl font-bold"
                    >
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    // Get current pricing based on selected variant and pricing tiers
    const getCurrentPrice = (): number => {
        if (selectedVariant) {
            return priceType === 'online' ? selectedVariant.price : (selectedVariant.compareAtPrice || selectedVariant.price);
        }

        // Fallback to pricing tiers
        const lowestPrice = priceType === 'online'
            ? getLowestOnlinePrice(product.pricing)
            : getLowestNormalPrice(product.pricing);
        return lowestPrice;
    };

    const getNormalPrice = (): number => {
        if (selectedVariant && selectedVariant.compareAtPrice) {
            return selectedVariant.compareAtPrice;
        }
        return getLowestNormalPrice(product.pricing);
    };

    const getSavings = (): number => {
        if (priceType === 'online') {
            const current = getCurrentPrice();
            const normal = getNormalPrice();
            return normal > current ? normal - current : 0;
        }
        return 0;
    };

    const getPricePerUnit = (): number => {
        if (!selectedVariant) return 0;

        const quantity = selectedVariant.options['Quantity']
            ? parseInt(selectedVariant.options['Quantity'].replace(/\D/g, ''))
            : product.minOrderQuantity || 1000;

        return getCurrentPrice() / quantity;
    };

    const handleVariantSelect = (variant: ProductVariant): void => {
        setSelectedVariant(variant);
    };

    // const handleAddToCart = (): void => {
    //     if (!selectedVariant) {
    //         alert('Please select a variant');
    //         return;
    //     }

    //     dispatch(addToCart({
    //         product,
    //         variant: selectedVariant,
    //         quantity: 1,
    //         priceType,
    //         turnaroundType,
    //     }));

    //     dispatch(openCart());
    // };

    const handleOrderWhatsApp = (): void => {
        if (!selectedVariant) {
            alert('Please select a variant');
            return;
        }

        // Generate WhatsApp message with product details
        const message = `Hi, I would like to order:

*Product:* ${product.title}
*Variant:* ${selectedVariant.title}
*Price:* ${getCurrentPrice()} AED
*Price per unit:* ${getPricePerUnit().toFixed(3)} AED

Please confirm availability and processing time.`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);

        // WhatsApp number (replace with your actual number)
        const whatsappNumber = import.meta.env.VITE_CONTACT_NUMBER;

        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Breadcrumb */}
            <div className="bg-white border-b-4 border-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link to="/" className="text-gray-600 hover:text-orange-600 font-bold transition-colors">Home</Link>
                        <span className="text-gray-400">/</span>
                        <Link to="/products" className="text-gray-600 hover:text-orange-600 font-bold transition-colors">Products</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-black truncate">{product.title}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-6 font-bold transition-colors group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Products
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column - Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border-4 ">
                            <img
                                src={product.images[selectedImage] || '/placeholder.jpg'}
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
                                        className={`rounded-2xl overflow-hidden transition-all duration-300 border-3 ${selectedImage === index
                                            ? 'ring-4 ring-orange-500 scale-105 border-orange-500'
                                            : ' hover:border-orange-300'
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
                        {product.features && product.features.length > 0 && (
                            <div className="bg-white rounded-3xl shadow-lg p-6 lg:p-8">
                                <h3 className="text-xl font-black mb-6 flex items-center gap-2 text-gray-900">
                                    <Check size={24} className="text-green-500" />
                                    Product Features
                                </h3>
                                <ul className="space-y-3">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="bg-green-100 p-1.5 rounded-full mt-0.5 flex-shrink-0">
                                                <Check size={14} className="text-green-600" />
                                            </div>
                                            <span className="text-gray-700 leading-relaxed font-medium text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {/* Specifications */}
                        {product.specifications && (
                            <div className="bg-white rounded-3xl shadow-lg p-6 lg:p-8 border-4 ">
                                <h3 className="text-xl font-black mb-6 text-gray-900">Specifications</h3>
                                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                                    {product.specifications.material && (
                                        <div className="bg-gray-50 p-3 lg:p-4 rounded-2xl border-2 border-gray-200">
                                            <div className="text-xs text-gray-500 mb-1 font-bold uppercase">Material</div>
                                            <div className="font-black text-gray-900 text-xs lg:text-sm">{product.specifications.material}</div>
                                        </div>
                                    )}
                                    {product.specifications.colors && (
                                        <div className="bg-gray-50 p-3 lg:p-4 rounded-2xl border-2 border-gray-200">
                                            <div className="text-xs text-gray-500 mb-1 font-bold uppercase">Colors</div>
                                            <div className="font-black text-gray-900 text-sm lg:text-base">{product.specifications.colors} Color</div>
                                        </div>
                                    )}
                                    {product.specifications.sides && (
                                        <div className="bg-gray-50 p-3 lg:p-4 rounded-2xl border-2 border-gray-200">
                                            <div className="text-xs text-gray-500 mb-1 font-bold uppercase">Sides</div>
                                            <div className="font-black text-gray-900 text-sm lg:text-base">{product.specifications.sides}</div>
                                        </div>
                                    )}
                                    {product.specifications.finish && (
                                        <div className="bg-gray-50 p-3 lg:p-4 rounded-2xl border-2 border-gray-200">
                                            <div className="text-xs text-gray-500 mb-1 font-bold uppercase">Finish</div>
                                            <div className="font-black text-gray-900 text-xs lg:text-sm">{product.specifications.finish}</div>
                                        </div>
                                    )}
                                    {product.specifications.size && (
                                        <div className="bg-gray-50 p-3 lg:p-4 rounded-2xl border-2 border-gray-200">
                                            <div className="text-xs text-gray-500 mb-1 font-bold uppercase">Size</div>
                                            <div className="font-black text-gray-900 text-sm lg:text-base">{product.specifications.size}</div>
                                        </div>
                                    )}
                                    {product.specifications.printType && (
                                        <div className="bg-gray-50 p-3 lg:p-4 rounded-2xl border-2 border-gray-200">
                                            <div className="text-xs text-gray-500 mb-1 font-bold uppercase">Print Type</div>
                                            <div className="font-black text-gray-900 text-xs lg:text-sm">{product.specifications.printType}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Details & Configuration */}
                    <div className="space-y-6">
                        {/* Product Header */}
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                {product.badge && (
                                    <span className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-black shadow-md ${product.badge === 'POPULAR' ? 'bg-blue-400 text-white' :
                                        product.badge === 'NEW' ? 'bg-green-400 text-white' :
                                            product.badge === 'BESTSELLER' ? 'bg-yellow-400 text-gray-900' :
                                                product.badge === 'HOT' ? 'bg-orange-400 text-white' :
                                                    'bg-gray-400 text-white'
                                        }`}>
                                        {product.badge}
                                    </span>
                                )}
                                {product.productCode && (
                                    <span className="bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full font-black text-sm border-orange-300">
                                        {product.productCode}
                                    </span>
                                )}
                            </div>

                            {product.category && (
                                <span className="text-gray-600 font-bold text-sm uppercase tracking-wide">
                                    {product.category.replace(/-/g, ' ')}
                                </span>
                            )}

                            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 leading-tight mt-2">
                                {product.title}
                            </h1>
                            <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-medium">
                                {product.description}
                            </p>
                        </div>

                        {/* Price Calculator Card */}
                        <div className="bg-gradient-to-br from-orange-50 to-orange-50 rounded-3xl shadow-xl p-6 lg:p-8">
                            <h3 className="text-xl font-black mb-6 text-gray-900">
                                Configure Your {product?.category}
                            </h3>

                            {/* Variant Selection */}
                            <div className="mb-6">
                                <label className="block text-sm font-black text-gray-700 mb-3">
                                    Select Variant
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {product.variants.filter(v => v.available).map((variant) => (
                                        <button
                                            key={variant.id}
                                            onClick={() => handleVariantSelect(variant)}
                                            disabled={!variant.available}
                                            className={`p-3 rounded-2xl font-black transition-all duration-300 text-center min-h-[70px] flex flex-col items-center justify-center ${selectedVariant?.id === variant.id
                                                ? 'bg-gradient-to-r from-orange-500 to-orange-500 text-white scale-105 shadow-lg'
                                                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                                                } ${!variant.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            <div className="text-sm lg:text-base">
                                                {variant.title}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Display */}
                            <div className="bg-white rounded-2xl p-5 lg:p-6 mb-6 shadow-md">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                    <div>
                                        <div className="text-xs text-gray-600 mb-2 font-bold uppercase">Total Price</div>
                                        <div className="text-3xl lg:text-4xl font-black text-orange-600">
                                            {getCurrentPrice()}<span className="text-lg lg:text-2xl ml-1">AED</span>
                                        </div>
                                    </div>
                                    {getSavings() > 0 && (
                                        <div className="text-left sm:text-right">
                                            <div className="text-sm text-gray-500 line-through mb-1 font-medium">
                                                {getNormalPrice()} AED
                                            </div>
                                            <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-black border-green-300">
                                                Save {getSavings()} AED!
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600 pt-4 border-t font-medium">
                                    Price per unit: <span className="text-orange-600 font-black">{getPricePerUnit().toFixed(3)} AED</span>
                                </div>
                            </div>

                            {/* Variant Stock Info */}
                            {selectedVariant && (
                                <div className="bg-blue-50 border-blue-200 rounded-xl p-3 mb-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-bold text-gray-700">Stock:</span>
                                        <span className={`font-black ${selectedVariant.quantity > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                                            {selectedVariant.available
                                                ? `${selectedVariant.quantity} available`
                                                : 'Out of stock'}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Add to Cart Button */}
                            {/* <button
                                onClick={handleAddToCart}
                                disabled={!selectedVariant || !selectedVariant.available}
                                className={`w-full font-black py-4 px-6 rounded-2xl text-base lg:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 border-2 ${!selectedVariant || !selectedVariant.available
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400'
                                    : 'bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white hover:scale-105 border-gray-900'
                                    }`}
                            >
                                <ShoppingCart size={22} />
                                {!selectedVariant ? 'Select a Variant' : !selectedVariant.available ? 'Out of Stock' : 'Add to Cart'}
                            </button> */}

                            <button
                                onClick={handleOrderWhatsApp}
                                disabled={!selectedVariant || !selectedVariant.available}
                                className={`w-full font-black py-4 px-6 rounded-2xl text-base lg:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 ${!selectedVariant || !selectedVariant.available
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:scale-105'
                                    }`}
                            >
                                <svg
                                    className="w-7 h-7"
                                    viewBox="0 0 24 24"
                                    fill="white"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                {!selectedVariant ? 'Select a Variant' : !selectedVariant.available ? 'Out of Stock' : 'Order via WhatsApp'}
                            </button>

                            {/* Additional Info */}
                            <div className="mt-6 space-y-2">
                                {product.turnaround && (
                                    <div className="flex items-center gap-3 text-xs sm:text-sm font-bold bg-white px-4 py-3 rounded-xl">
                                        <Clock size={16} className="text-blue-600 flex-shrink-0" />
                                        <span className="text-gray-700">
                                            Delivery: {turnaroundType === 'express'
                                                ? product.turnaround.express
                                                : product.turnaround.normal}
                                        </span>
                                    </div>
                                )}
                                {product.minOrderQuantity && (
                                    <div className="flex items-center gap-3 text-xs sm:text-sm font-bold bg-white px-4 py-3 rounded-xl">
                                        <Package size={16} className="text-purple-600 flex-shrink-0" />
                                        <span className="text-gray-700">Min order: {product.minOrderQuantity} pcs</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-3 text-xs sm:text-sm font-bold bg-white px-4 py-3 rounded-xl">
                                    <Shield size={16} className="text-green-600 flex-shrink-0" />
                                    <span className="text-gray-700">Quality Guaranteed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing Table */}
                {product.pricing.length > 0 && (
                    <div className="mt-12 bg-white rounded-3xl shadow-lg p-6 lg:p-8">
                        <h3 className="text-2xl lg:text-3xl font-black mb-6 text-gray-900">Pricing Table</h3>
                        <div className="overflow-x-auto -mx-6 lg:mx-0">
                            <div className="inline-block min-w-full align-middle px-6 lg:px-0">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="border-b-4 border-gray-900 bg-gray-50">
                                            <th className="text-left py-4 px-3 lg:px-4 font-black text-gray-900 text-sm lg:text-base">Quantity</th>
                                            <th className="text-right py-4 px-3 lg:px-4 font-black text-gray-900 text-sm lg:text-base whitespace-nowrap">Normal</th>
                                            <th className="text-right py-4 px-3 lg:px-4 font-black text-green-600 text-sm lg:text-base whitespace-nowrap">Online</th>
                                            <th className="text-right py-4 px-3 lg:px-4 font-black text-gray-900 text-sm lg:text-base whitespace-nowrap">Per Unit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product.pricing
                                            .filter(p => p.type === 'online')
                                            .map((tier, index) => {
                                                const normalPrice = product.pricing.find(
                                                    p => p.quantity === tier.quantity && p.type === 'normal'
                                                );

                                                return (
                                                    <tr key={index} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                                                        <td className="py-3 lg:py-4 px-3 lg:px-4 font-black text-gray-900 text-sm lg:text-base whitespace-nowrap">
                                                            {tier.quantity.toLocaleString()} pcs
                                                        </td>
                                                        <td className="py-3 lg:py-4 px-3 lg:px-4 text-right text-gray-600 font-bold text-sm lg:text-base whitespace-nowrap">
                                                            {normalPrice?.price || '-'} AED
                                                        </td>
                                                        <td className="py-3 lg:py-4 px-3 lg:px-4 text-right text-green-600 font-black text-sm lg:text-base whitespace-nowrap">
                                                            {tier.price} AED
                                                        </td>
                                                        <td className="py-3 lg:py-4 px-3 lg:px-4 text-right text-xs lg:text-sm text-gray-600 font-bold whitespace-nowrap">
                                                            {(tier.price / tier.quantity).toFixed(3)} AED
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetailPage;