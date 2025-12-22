import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Shield, TrendingDown, Zap } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchFeaturedProducts } from '../store/productsSlice';
import { fetchCollections } from '../store/collectionsSlice';
import { generateCategoriesFromCollections } from '../utils/transformers';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();

    // Select data from Redux store
    const { featuredProducts, loading: productsLoading, error: productsError } = useAppSelector(
        (state) => state.products
    );
    const { items: collections, loading: collectionsLoading } = useAppSelector(
        (state) => state.collections
    );

    // Fetch data on component mount
    useEffect(() => {
        dispatch(fetchFeaturedProducts(12));
        dispatch(fetchCollections(10));
    }, [dispatch]);

    // Generate categories from collections
    const categories = generateCategoriesFromCollections(collections);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            {/* Hero Section - Vector Style */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                {/* Geometric Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300 rounded-lg rotate-12 opacity-30"></div>
                    <div className="absolute top-40 right-20 w-16 h-16 bg-red-400 rounded-full opacity-30"></div>
                    <div className="absolute bottom-40 left-1/4 w-24 h-24 border-4 border-blue-400 rounded-lg rotate-45 opacity-30"></div>
                    <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-purple-400 opacity-30 transform rotate-12" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                                <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Professional</span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Printing</span>
                                <br />
                                <span className="text-gray-900">Services</span>
                            </h1>

                            <p className="text-xl text-gray-700 mb-8 max-w-xl">
                                High-quality printing at prices you won't believe. From business cards to banners, we've got you covered! 🎨
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    to="/products"
                                    className="group inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                                >
                                    <span>Browse Products</span>
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                </Link>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 bg-white border-3 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                                >
                                    Get a Quote
                                </Link>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-4 gap-4 mt-12">
                                {[
                                    { value: '10K+', label: 'Happy Clients', color: 'from-blue-400 to-blue-500' },
                                    { value: `${collections.length || '50'}+`, label: 'Collections', color: 'from-purple-400 to-purple-500' },
                                    { value: '6 Hrs', label: 'Express', color: 'from-pink-400 to-pink-500' },
                                    { value: '24/7', label: 'Support', color: 'from-orange-400 to-orange-500' }
                                ].map((stat, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className={`bg-gradient-to-br ${stat.color} text-white font-black text-2xl py-3 rounded-xl shadow-lg mb-2`}>
                                            {stat.value}
                                        </div>
                                        <div className="text-xs font-bold text-gray-600">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Illustration */}
                        <div className="relative hidden lg:block">
                            <div className="relative w-full aspect-square">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="absolute w-96 h-96 bg-gradient-to-br from-red-400 to-pink-400 rounded-full opacity-20"></div>
                                    <div className="relative">
                                        <div className="w-64 h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-3xl shadow-2xl relative">
                                            <div className="absolute top-6 left-6 right-6 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl"></div>
                                            <div className="absolute bottom-6 left-6 flex gap-2">
                                                <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                                                <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                                                <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="absolute -right-8 top-1/2 -translate-y-1/2">
                                            <div className="w-32 h-40 bg-white rounded-lg shadow-xl border-4 border-gray-900 relative overflow-hidden">
                                                <div className="absolute top-4 left-4 right-4 h-2 bg-red-400 rounded"></div>
                                                <div className="absolute top-10 left-4 right-4 h-2 bg-blue-400 rounded"></div>
                                                <div className="absolute top-16 left-4 right-4 h-2 bg-purple-400 rounded"></div>
                                                <div className="absolute top-22 left-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl rotate-12 animate-bounce shadow-lg"></div>
                                <div className="absolute bottom-20 right-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-pulse shadow-lg"></div>
                                <div className="absolute top-1/2 left-0 w-12 h-12 bg-gradient-to-br from-pink-400 to-red-400 rounded-lg -rotate-12 animate-bounce shadow-lg" style={{ animationDelay: '0.5s' }}></div>
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
                            <div key={idx} className={`group bg-gradient-to-br ${feature.bgGradient} p-8 rounded-3xl border-4 border-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                                <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 border-4 border-gray-900 group-hover:rotate-6 transition-all duration-300`}>
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
                        <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-black text-sm mb-4 shadow-lg border-3 border-gray-900">
                            ✨ PRODUCT CATEGORIES
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Browse by Category
                        </h2>
                        <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
                            Find the perfect printing solution for your needs
                        </p>
                    </div>

                    {collectionsLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500"></div>
                        </div>
                    ) : categories.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {categories.slice(0, 6).map((category, index) => {
                                const gradients = [
                                    'from-red-400 to-pink-500',
                                    'from-blue-400 to-purple-500',
                                    'from-green-400 to-teal-500',
                                    'from-yellow-400 to-orange-500',
                                    'from-purple-400 to-pink-500',
                                    'from-cyan-400 to-blue-500'
                                ];
                                const gradient = gradients[index % gradients.length];

                                return (
                                    <Link
                                        key={category.id}
                                        to={`/products?collection=${category.slug}`}
                                        className="group bg-white rounded-3xl border-4 border-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
                                    >
                                        <div className={`bg-gradient-to-br ${gradient} p-6 border-b-4 border-gray-900`}>
                                            <div className="text-6xl mb-2 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                                                {category.icon}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm font-bold text-gray-500 mb-3">
                                                {category.productCount} products available
                                            </p>
                                            <p className="text-gray-700 mb-4 leading-relaxed font-medium line-clamp-2">
                                                {category.description}
                                            </p>
                                            <span className="inline-flex items-center gap-2 text-red-600 font-black group-hover:gap-3 transition-all">
                                                Explore Now
                                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">No collections available</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 lg:mb-16">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-2xl font-black text-sm mb-4 shadow-lg border-3 border-gray-900">
                            <Star size={18} strokeWidth={3} />
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
                                {featuredProducts.slice(0, 8).map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            <div className="text-center mt-12">
                                <Link
                                    to="/products"
                                    className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-gray-900"
                                >
                                    <span>View All Products</span>
                                    <ArrowRight size={22} strokeWidth={3} />
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-600 text-lg">No featured products available</p>
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
                    <div className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-2xl font-black text-lg mb-8 shadow-2xl border-4 border-gray-900 animate-bounce">
                        <Zap size={24} strokeWidth={3} />
                        <span>LIMITED TIME OFFER</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-white drop-shadow-lg">
                        STRANGE AND UNBELIEVABLE PRICES!
                    </h2>
                    <p className="text-2xl lg:text-3xl mb-10 max-w-3xl mx-auto text-white font-bold drop-shadow-lg">
                        Business cards from <span className="bg-white text-red-600 px-4 py-2 rounded-xl inline-block border-3 border-gray-900">37 AED</span> for 1000 pcs!
                        <br className="hidden sm:block" />
                        Flyers from <span className="bg-white text-red-600 px-4 py-2 rounded-xl inline-block border-3 border-gray-900 mt-2">46 AED</span>!
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/products?category=business-cards"
                            className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-yellow-300 px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-gray-900"
                        >
                            Business Cards
                        </Link>
                        <Link
                            to="/products?category=flyers"
                            className="inline-flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-white"
                        >
                            Flyers & Brochures
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Why Choose Diamond Press?
                        </h2>
                        <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
                            The leading printing service in UAE 🏆
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
                            <div key={idx} className={`group bg-gradient-to-br ${item.bgGradient} p-8 lg:p-10 rounded-3xl border-4 border-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                                <div className="flex items-start gap-6">
                                    <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 border-4 border-gray-900 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
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
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden border-4 border-gray-900 shadow-2xl">
                        <div className="absolute top-10 right-10 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
                        <div className="absolute bottom-10 left-10 w-32 h-32 bg-red-400 opacity-20" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
                                Ready to Get Started? 🚀
                            </h2>
                            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-medium">
                                Browse our products or contact us for a custom quote. We're here to help bring your vision to life!
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    to="/products"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white"
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