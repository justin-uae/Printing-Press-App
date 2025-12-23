import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Shield, TrendingDown, CheckCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts } from '../store/productsSlice';
import ProductCard from '../components/ProductCard';
import type { Product } from '..';
import Banner from '../assets/Banner.jpg'

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();

    // Select data from Redux store
    const { items: allProducts, loading: productsLoading, error: productsError } = useAppSelector(
        (state) => state.products
    );

    // Fetch data on component mount
    useEffect(() => {
        dispatch(fetchProducts({ first: 100 }));
    }, [dispatch]);

    // Get featured products (products with POPULAR, BESTSELLER, or NEW badge)
    const featuredProducts = useMemo((): Product[] => {
        if (!allProducts.length) return [];

        return allProducts
            .filter(product =>
                product.badge === 'POPULAR' ||
                product.badge === 'BESTSELLER' ||
                product.badge === 'NEW' ||
                product.badge === 'HOT'
            )
            .slice(0, 8);
    }, [allProducts]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-gray-100 via-gray-50 to-white">
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>

                {/* Gradient accents - matching banner gray tones */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gray-200 to-gray-100 opacity-30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-gray-100 to-gray-200 opacity-20 rounded-full blur-3xl"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* LEFT CONTENT */}
                        <div>
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold mb-6 shadow-md">
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                UAE's Trusted Printing Partner
                            </div>

                            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
                                Diamond Press
                                <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                                    Quality Printing Services
                                </span>
                            </h1>

                            <p className="mt-6 max-w-xl text-lg sm:text-xl text-gray-600 leading-relaxed">
                                Professional printing solutions across the UAE. From business cards to large-format banners — delivered with precision, speed, and unmatched quality.
                            </p>

                            {/* CTA Buttons */}
                            <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/products"
                                    className="group inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 px-8 py-4 font-bold text-lg text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    View Products
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white hover:bg-gray-50 px-8 py-4 font-bold text-lg text-gray-900 shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    Request Quote
                                </Link>
                            </div>

                            {/* STATS */}
                            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                    { value: '15+', label: 'Years' },
                                    { value: `${allProducts.length || '100'}+`, label: 'Products' },
                                    { value: '10K+', label: 'Clients' },
                                    { value: '24/7', label: 'Support' }
                                ].map((stat, idx) => (
                                    <div
                                        key={idx}
                                        className="rounded-lg bg-white border border-gray-200 p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="text-2xl sm:text-3xl font-bold text-red-600">
                                            {stat.value}
                                        </div>
                                        <div className="mt-1 text-xs sm:text-sm font-medium text-gray-600">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT VISUAL - Real Printing Press Image - Now visible on all devices */}
                        <div className="relative">
                            <div className="relative">
                                {/* Main image container */}
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                                    {/* Replace this src with your actual printing press image */}
                                    <img
                                        src={Banner}
                                        alt="Professional Printing Press"
                                        className="w-full h-[400px] lg:h-[500px] object-cover"
                                    />

                                    {/* Overlay gradient for better badge visibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>

                                {/* Quality badge */}
                                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-full shadow-xl transform rotate-12 z-10">
                                    <div className="text-sm font-bold">Premium Quality</div>
                                </div>

                                {/* Fast Delivery badge */}
                                <div className="absolute -bottom-4 -left-4 bg-white border-2 border-red-600 rounded-lg px-4 py-2 shadow-lg z-10">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle size={16} className="text-green-500" />
                                        <span className="text-sm font-bold text-gray-900">Fast Delivery</span>
                                    </div>
                                </div>

                                {/* CMYK Color indicators overlay */}
                                <div className="absolute bottom-6 right-6 flex gap-2 z-10">
                                    <div className="w-10 h-10 bg-cyan-500 rounded-full shadow-lg border-2 border-white"></div>
                                    <div className="w-10 h-10 bg-pink-500 rounded-full shadow-lg border-2 border-white"></div>
                                    <div className="w-10 h-10 bg-yellow-400 rounded-full shadow-lg border-2 border-white"></div>
                                    <div className="w-10 h-10 bg-gray-900 rounded-full shadow-lg border-2 border-white"></div>
                                </div>

                                {/* Decorative blur elements */}
                                <div className="absolute -top-6 -left-6 w-16 h-16 bg-red-600 opacity-20 rounded-full blur-xl animate-pulse"></div>
                                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-600 opacity-20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Features Section */}
            <section className="py-16 lg:py-24 bg-white relative">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: TrendingDown,
                                title: 'Unbelievable Prices',
                                description: 'Get premium quality prints at prices that seem too good to be true',
                                gradient: 'from-red-400 to-pink-500',
                                bgGradient: 'from-red-50 to-pink-50'
                            },
                            {
                                icon: Clock,
                                title: 'Fast Turnaround',
                                description: 'Express options available with delivery in as fast as 6 hours',
                                gradient: 'from-blue-400 to-purple-500',
                                bgGradient: 'from-blue-50 to-purple-50'
                            },
                            {
                                icon: Shield,
                                title: 'Premium Quality',
                                description: 'Professional grade materials and cutting-edge technology',
                                gradient: 'from-green-400 to-teal-500',
                                bgGradient: 'from-green-50 to-teal-50'
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className={`group bg-gradient-to-br ${feature.bgGradient} p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                                <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-all duration-300`}>
                                    <feature.icon size={36} className="text-white" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-2xl font-black mb-3 text-gray-900 text-center">{feature.title}</h3>
                                <p className="text-gray-700 leading-relaxed text-center font-medium">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
                <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-300 opacity-20" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12 lg:mb-16">
                        <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-black text-sm mb-4 shadow-lg">
                            PRODUCT TYPES
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Our Printing Services
                        </h2>
                        <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
                            Professional printing solutions for every business need
                        </p>
                    </div>

                    <div className="relative">
                        {/* Floating cards container with responsive grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">

                            {/* Business Cards */}
                            <div className="relative group">
                                <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-blue-100 group-hover:border-blue-300">
                                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-white font-black text-sm">01</span>
                                    </div>
                                    <div className="mb-6">
                                        <div className="w-16 h-12 bg-white rounded-lg shadow-inner p-2 mx-auto">
                                            <div className="h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded"></div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 text-center mb-2 group-hover:text-blue-600 transition-colors">
                                        Business Cards
                                    </h3>
                                    <p className="text-sm text-gray-600 text-center font-medium">
                                        Premium quality cards
                                    </p>
                                </div>
                            </div>

                            {/* Brochures */}
                            <div className="relative group md:translate-y-4">
                                <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-green-100 group-hover:border-green-300">
                                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-white font-black text-sm">02</span>
                                    </div>
                                    <div className="mb-6">
                                        <div className="w-16 h-12 bg-gradient-to-br from-green-100 to-white rounded-lg shadow-inner p-2 mx-auto">
                                            <div className="h-full flex gap-1">
                                                <div className="w-1/3 bg-gradient-to-b from-green-400 to-emerald-500 rounded"></div>
                                                <div className="w-2/3">
                                                    <div className="h-2 bg-gradient-to-r from-green-300 to-emerald-400 rounded mb-1"></div>
                                                    <div className="h-2 bg-gradient-to-r from-green-200 to-green-300 rounded w-3/4"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 text-center mb-2 group-hover:text-green-600 transition-colors">
                                        Brochures
                                    </h3>
                                    <p className="text-sm text-gray-600 text-center font-medium">
                                        Marketing materials
                                    </p>
                                </div>
                            </div>

                            {/* Stickers & Labels */}
                            <div className="relative group">
                                <div className="bg-gradient-to-br from-yellow-50 to-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-yellow-100 group-hover:border-yellow-300">
                                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-white font-black text-sm">03</span>
                                    </div>
                                    <div className="mb-6">
                                        <div className="flex justify-center gap-2">
                                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full"></div>
                                            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg"></div>
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg"></div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 text-center mb-2 group-hover:text-orange-600 transition-colors">
                                        Stickers & Labels
                                    </h3>
                                    <p className="text-sm text-gray-600 text-center font-medium">
                                        Custom adhesive prints
                                    </p>
                                </div>
                            </div>

                            {/* Banners */}
                            <div className="relative group md:translate-y-4">
                                <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-purple-100 group-hover:border-purple-300">
                                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-white font-black text-sm">04</span>
                                    </div>
                                    <div className="mb-6">
                                        <div className="w-20 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md mx-auto flex items-center justify-center">
                                            <span className="text-white text-xs font-black">BANNER</span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 text-center mb-2 group-hover:text-purple-600 transition-colors">
                                        Banners
                                    </h3>
                                    <p className="text-sm text-gray-600 text-center font-medium">
                                        Large format printing
                                    </p>
                                </div>
                            </div>

                            {/* Packaging */}
                            <div className="relative group md:col-span-2 lg:col-span-1">
                                <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-red-100 group-hover:border-red-300">
                                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-white font-black text-sm">05</span>
                                    </div>
                                    <div className="mb-6">
                                        <div className="flex justify-center gap-3">
                                            <div className="w-12 h-10 bg-gradient-to-br from-orange-100 to-white border border-orange-200 rounded transform -rotate-6">
                                                <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-sm mt-2 mx-2"></div>
                                            </div>
                                            <div className="w-12 h-10 bg-gradient-to-br from-gray-100 to-white border border-gray-300 rounded transform rotate-6">
                                                <div className="h-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-sm mt-2 mx-2"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 text-center mb-2 group-hover:text-red-600 transition-colors">
                                        Packaging
                                    </h3>
                                    <p className="text-sm text-gray-600 text-center font-medium">
                                        Custom boxes & packaging
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Floating animation elements */}
                        <div className="absolute top-1/4 left-5 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-50"></div>
                        <div className="absolute top-1/3 right-10 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-50 delay-75"></div>
                        <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-50 delay-150"></div>
                        <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-50 delay-300"></div>
                    </div>

                    {/* View All Products Button */}
                    <div className="text-center mt-12 lg:mt-16">
                        <Link
                            to="/products"
                            className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                            View All Products
                            <div className="group-hover:translate-x-2 transition-transform duration-300">
                                <ArrowRight size={24} strokeWidth={3} />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 lg:mb-16">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-2xl font-black text-sm mb-4 shadow-lg">
                            <span>BEST SELLERS</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Featured Products
                        </h2>
                        <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
                            Our most popular printing products at unbeatable prices
                        </p>
                    </div>

                    {productsLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500"></div>
                        </div>
                    ) : productsError ? (
                        <div className="text-center py-20 bg-red-50 rounded-3xl">
                            <p className="text-red-600 text-lg font-bold">Error loading products</p>
                            <p className="text-gray-600 mt-2">{productsError}</p>
                        </div>
                    ) : featuredProducts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                                {featuredProducts?.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            <div className="text-center mt-12">
                                <Link
                                    to="/products"
                                    className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                                >
                                    <span>View All Products</span>
                                    <ArrowRight size={22} strokeWidth={3} />
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4"></div>
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                            >
                                Browse All Products
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Special Offer Banner */}
            <section className="py-16 lg:py-24 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-yellow-300 rounded-full"></div>
                    <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-blue-300" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
                    <div className="absolute top-1/2 left-10 w-32 h-32 border-8 border-white rounded-full"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-2xl font-black text-lg mb-8 shadow-2xl animate-bounce">
                        <span>LIMITED TIME OFFER</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-white drop-shadow-lg">
                        STRANGE AND UNBELIEVABLE PRICES!
                    </h2>
                    <p className="text-2xl lg:text-3xl mb-10 max-w-3xl mx-auto text-white font-bold drop-shadow-lg">
                        Business cards from <span className="bg-white text-red-600 px-4 py-2 rounded-xl inline-block">37 AED</span> for 1000 pcs!
                        <br className="hidden sm:block" />
                        Flyers and Brochures from <span className="bg-white text-red-600 px-4 py-2 rounded-xl inline-block mt-2">50 AED</span>!
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/products?category=Business Cards"
                            className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-yellow-300 px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                            Business Cards
                        </Link>
                        <Link
                            to="/products?category=Flyers and Brochures"
                            className="inline-flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                            Flyers and Brochures
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Why Choose Dubai Print & Design?
                        </h2>
                        <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
                            The leading printing service in UAE
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {[
                            {
                                icon: Star,
                                title: 'Premium Materials',
                                description: 'We use only the highest quality paper stocks and printing materials. From 350gsm matt laminated cards to glossy brochures, every product is crafted with excellence.',
                                gradient: 'from-yellow-400 to-orange-500',
                                bgGradient: 'from-yellow-50 to-orange-50'
                            },
                            {
                                icon: Clock,
                                title: 'Quick Turnaround',
                                description: 'Standard orders delivered in 1-2 business days. Need it faster? Our express service can deliver your prints in just 6 hours!',
                                gradient: 'from-blue-400 to-purple-500',
                                bgGradient: 'from-blue-50 to-purple-50'
                            },
                            {
                                icon: TrendingDown,
                                title: 'Incredible Pricing',
                                description: 'Our prices are truly unbelievable! Get professional business cards from 37 AED, flyers from 46 AED, and much more.',
                                gradient: 'from-red-400 to-pink-500',
                                bgGradient: 'from-red-50 to-pink-50'
                            },
                            {
                                icon: Shield,
                                title: 'Quality Guaranteed',
                                description: 'Every print job is carefully inspected before delivery. We stand behind our work with a 100% satisfaction guarantee.',
                                gradient: 'from-green-400 to-teal-500',
                                bgGradient: 'from-green-50 to-teal-50'
                            }
                        ].map((item, idx) => (
                            <div key={idx} className={`group bg-gradient-to-br ${item.bgGradient} p-8 lg:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                                <div className="flex items-start gap-6">
                                    <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                                        <item.icon size={32} className="text-white" strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black mb-3 text-gray-900">{item.title}</h3>
                                        <p className="text-gray-700 leading-relaxed font-medium">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute top-10 right-10 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
                        <div className="absolute bottom-10 left-10 w-32 h-32 bg-red-400 opacity-20" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
                                Ready to Get Started?
                            </h2>
                            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-medium">
                                Browse our products or contact us for a custom quote. We're here to help bring your vision to life!
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    to="/products"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                                >
                                    Browse Products
                                </Link>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-yellow-300 px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;