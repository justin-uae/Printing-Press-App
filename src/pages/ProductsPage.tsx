import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown, ArrowUp } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts } from '../store/productsSlice';
import ProductCard from '../components/ProductCard';
import type { Product } from '..';

interface Category {
    id: string;
    name: string;
    slug: string;
    icon: string;
    productCount: number;
    description: string;
}

const ProductsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<string>('featured');
    const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

    // Get data from Redux store
    const { items: allProducts, loading: productsLoading, error } = useAppSelector(
        (state) => state.products
    );

    // Fetch initial data
    useEffect(() => {
        dispatch(fetchProducts({ first: 100 }));
    }, [dispatch]);

    // Handle URL params
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        } else {
            setSelectedCategory(null);
        }
    }, [searchParams]);

    // Handle scroll for showing/hiding scroll to top button
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Generate categories from product.category field
    const categories = useMemo((): Category[] => {
        if (!allProducts.length) return [];

        // Get unique categories from products
        const categoryMap = new Map<string, { count: number; products: Product[] }>();

        allProducts.forEach(product => {
            if (product.category) {
                const existing = categoryMap.get(product.category) || { count: 0, products: [] };
                categoryMap.set(product.category, {
                    count: existing.count + 1,
                    products: [...existing.products, product]
                });
            }
        });

        // Map categories to Category objects with icons
        const categoryIcons: Record<string, string> = {
            'business-cards-stationery': '💼',
            'business-cards': '💼',
            'flyers-brochures': '📄',
            'flyers': '📄',
            'brochures': '📄',
            'stickers-labels': '🏷️',
            'stickers': '🏷️',
            'labels': '🏷️',
            'packaging': '📦',
            'marketing-materials': '📢',
            'marketing': '📢',
            'banners': '🎌',
            'posters': '🖼️',
            'catalogs': '📚',
            'letterheads': '📝',
            'envelopes': '✉️',
            'folders': '📁',
            'calendars': '📅',
            'notebooks': '📓',
        };

        const categoryDescriptions: Record<string, string> = {
            'business-cards-stationery': 'Professional business cards and stationery',
            'business-cards': 'High-quality business cards',
            'flyers-brochures': 'Eye-catching flyers and brochures',
            'flyers': 'Promotional flyers',
            'brochures': 'Informative brochures',
            'stickers-labels': 'Custom stickers and labels',
            'stickers': 'Custom stickers',
            'labels': 'Professional labels',
            'packaging': 'Custom packaging solutions',
            'marketing-materials': 'Complete marketing materials',
            'marketing': 'Marketing materials',
            'banners': 'Large format banners',
            'posters': 'Eye-catching posters',
            'catalogs': 'Product catalogs',
            'letterheads': 'Professional letterheads',
            'envelopes': 'Custom envelopes',
            'folders': 'Presentation folders',
            'calendars': 'Custom calendars',
            'notebooks': 'Branded notebooks',
        };

        return Array.from(categoryMap.entries())
            .map(([categorySlug, data]) => {
                const name = categorySlug
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

                return {
                    id: categorySlug,
                    name,
                    slug: categorySlug,
                    icon: categoryIcons[categorySlug] || '🖨️',
                    productCount: data.count,
                    description: categoryDescriptions[categorySlug] || `${name} products`
                };
            })
            .sort((a, b) => b.productCount - a.productCount); // Sort by product count
    }, [allProducts]);

    // Filter and sort products
    const filteredProducts = useMemo((): Product[] => {
        let filtered: Product[] = [];

        // Filter by category
        if (selectedCategory) {
            filtered = allProducts.filter(product => product.category === selectedCategory);
        } else {
            filtered = [...allProducts];
        }

        // Sort products
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => {
                    const priceA = a.pricing.length > 0
                        ? Math.min(...a.pricing.filter(p => p.type === 'online').map(p => p.price))
                        : 0;
                    const priceB = b.pricing.length > 0
                        ? Math.min(...b.pricing.filter(p => p.type === 'online').map(p => p.price))
                        : 0;
                    return priceA - priceB;
                });
                break;
            case 'price-high':
                filtered.sort((a, b) => {
                    const priceA = a.pricing.length > 0
                        ? Math.min(...a.pricing.filter(p => p.type === 'online').map(p => p.price))
                        : 0;
                    const priceB = b.pricing.length > 0
                        ? Math.min(...b.pricing.filter(p => p.type === 'online').map(p => p.price))
                        : 0;
                    return priceB - priceA;
                });
                break;
            case 'name':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'featured':
            default:
                // Keep original order (featured products first if badge exists)
                filtered.sort((a, b) => {
                    const aFeatured = a.badge === 'POPULAR' || a.badge === 'BESTSELLER' ? 1 : 0;
                    const bFeatured = b.badge === 'POPULAR' || b.badge === 'BESTSELLER' ? 1 : 0;
                    return bFeatured - aFeatured;
                });
                break;
        }

        return filtered;
    }, [allProducts, selectedCategory, sortBy]);

    const handleCategoryChange = (categoryId: string): void => {
        if (categoryId === selectedCategory) {
            setSelectedCategory(null);
            setSearchParams({});
        } else {
            setSelectedCategory(categoryId);
            setSearchParams({ category: categoryId });
        }
    };

    const handleResetFilters = (): void => {
        setSelectedCategory(null);
        setSortBy('featured');
        setSearchParams({});
    };

    const selectedCategoryData = categories.find(c => c.id === selectedCategory);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
                            {selectedCategoryData ? selectedCategoryData.name : 'All Products'}
                        </h1>
                        <p className="text-lg sm:text-xl text-red-100 max-w-2xl mx-auto font-medium">
                            {selectedCategoryData
                                ? selectedCategoryData.description
                                : 'Browse our complete collection of professional printing products'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar - Desktop */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                                    <Filter size={20} className="text-red-600" />
                                    Categories
                                </h3>
                                {selectedCategory && (
                                    <button
                                        onClick={handleResetFilters}
                                        className="text-sm text-red-600 hover:text-red-700 font-bold hover:underline transition-colors"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>

                            {/* Categories */}
                            {categories.length > 0 ? (
                                <div className="space-y-2">
                                    {categories.map(category => (
                                        <label
                                            key={category.id}
                                            className={`flex items-center gap-3 cursor-pointer p-3 rounded-2xl transition-all duration-200 ${selectedCategory === category.id
                                                ? 'bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200'
                                                : 'hover:bg-gray-50'
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedCategory === category.id}
                                                onChange={() => handleCategoryChange(category.id)}
                                                className="w-5 h-5 text-red-600 rounded focus:ring-red-500 focus:ring-2"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-bold text-gray-700">
                                                        {category.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 text-center py-4">
                                    No categories available
                                </p>
                            )}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Mobile Filter Toggle & Sort */}
                        <div className="mb-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white rounded-2xl shadow-md p-4">
                            <div className="flex items-center justify-between gap-3 sm:flex-1">
                                {/* Mobile Filter Button */}
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="lg:hidden inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2.5 rounded-xl font-bold hover:from-red-600 hover:to-pink-600 transition-all duration-300"
                                >
                                    <Filter size={18} />
                                    <span className="hidden xs:inline">Filters</span>
                                </button>

                                {/* Results Count */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600 font-medium hidden sm:inline">Found</span>
                                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-black">
                                        {filteredProducts.length}
                                    </span>
                                </div>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="relative sm:w-auto w-full">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-bold text-gray-700 hover:border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all cursor-pointer"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name">Name: A to Z</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={18} />
                            </div>
                        </div>

                        {/* Mobile Filters - Slide-in Sidebar */}
                        {showFilters && (
                            <>
                                {/* Backdrop */}
                                <div
                                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                                    onClick={() => setShowFilters(false)}
                                ></div>

                                {/* Sidebar */}
                                <div className="lg:hidden fixed right-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-2xl z-50 overflow-y-auto">
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-6 sticky top-0 bg-white pb-4 border-b-2 border-gray-200">
                                            <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                                                <Filter size={20} className="text-red-600" />
                                                Filter by Category
                                            </h3>
                                            <button
                                                onClick={() => setShowFilters(false)}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>

                                        {categories.length > 0 ? (
                                            <div className="space-y-2 mb-6">
                                                {categories.map(category => (
                                                    <label
                                                        key={category.id}
                                                        className={`flex items-center gap-3 cursor-pointer p-3 rounded-2xl transition-all ${selectedCategory === category.id
                                                            ? 'bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200'
                                                            : 'hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedCategory === category.id}
                                                            onChange={() => handleCategoryChange(category.id)}
                                                            className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                                                        />
                                                        <div className="flex-1">
                                                            <span className="text-sm font-bold">{category.name}</span>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-500 text-center py-4 mb-6">
                                                No categories available
                                            </p>
                                        )}

                                        <button
                                            onClick={handleResetFilters}
                                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors"
                                        >
                                            Reset Filters
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Active Filters */}
                        {selectedCategory && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold shadow-md">
                                    <span>{selectedCategoryData?.name}</span>
                                    <button
                                        onClick={() => handleCategoryChange(selectedCategory)}
                                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Loading State */}
                        {productsLoading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500"></div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-20 bg-red-50 rounded-3xl shadow-lg">
                                <div className="text-6xl mb-4">⚠️</div>
                                <h3 className="text-2xl font-black text-gray-900 mb-3">Error Loading Products</h3>
                                <p className="text-gray-600 font-medium">{error}</p>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 lg:py-24 bg-white rounded-3xl shadow-lg">
                                <div className="text-6xl lg:text-7xl mb-6">📦</div>
                                <h3 className="text-2xl lg:text-3xl font-black mb-3 text-gray-900">No products found</h3>
                                <p className="text-gray-600 mb-8 text-lg font-medium">
                                    {selectedCategory
                                        ? 'No products in this category. Try another category or reset filters.'
                                        : 'Try adjusting your filters to see more results'}
                                </p>
                                <button
                                    onClick={handleResetFilters}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-bounce"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={15} strokeWidth={4} />
                </button>
            )}
        </div>
    );
};

export default ProductsPage;