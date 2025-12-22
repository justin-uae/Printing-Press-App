import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, X, ChevronDown } from 'lucide-react';
import { setSelectedCategory, setSortBy, resetFilters } from '../store/slices/filterSlice';
import { categories, products, getProductsByCategory } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import type { RootState, Product } from '../types';

const ProductsPage: React.FC = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

    const selectedCategory = useSelector((state: RootState) => state.filter.selectedCategory);
    const sortBy = useSelector((state: RootState) => state.filter.sortBy);

    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            dispatch(setSelectedCategory(categoryParam));
        }
    }, [searchParams]);

    useEffect(() => {
        let filtered = [...products];

        if (selectedCategory) {
            filtered = getProductsByCategory(selectedCategory);
        }

        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => {
                    const priceA = Math.min(...a.pricing.filter(p => p.type === 'online').map(p => p.price));
                    const priceB = Math.min(...b.pricing.filter(p => p.type === 'online').map(p => p.price));
                    return priceA - priceB;
                });
                break;
            case 'price-high':
                filtered.sort((a, b) => {
                    const priceA = Math.min(...a.pricing.filter(p => p.type === 'online').map(p => p.price));
                    const priceB = Math.min(...b.pricing.filter(p => p.type === 'online').map(p => p.price));
                    return priceB - priceA;
                });
                break;
            case 'name':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'featured':
            default:
                filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
        }

        setFilteredProducts(filtered);
    }, [selectedCategory, sortBy]);

    const handleCategoryChange = (categoryId: string): void => {
        if (categoryId === selectedCategory) {
            dispatch(setSelectedCategory(null));
            setSearchParams({});
        } else {
            dispatch(setSelectedCategory(categoryId));
            setSearchParams({ category: categoryId });
        }
    };

    const handleResetFilters = (): void => {
        dispatch(resetFilters());
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
                                    Filters
                                </h3>
                                {(selectedCategory) && (
                                    <button
                                        onClick={handleResetFilters}
                                        className="text-sm text-red-600 hover:text-red-700 font-bold hover:underline transition-colors"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>

                            {/* Categories */}
                            <div className="space-y-2">
                                {categories.map(category => (
                                    <label
                                        key={category.id}
                                        className={`flex items-center gap-3 cursor-pointer p-3 rounded-2xl transition-all duration-200 ${selectedCategory === category.id
                                                ? 'bg-gradient-to-r from-red-50 to-pink-50'
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
                                            <p className="text-sm font-bold text-gray-700">
                                                {category.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {category.productCount} items
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Mobile Filter Toggle & Sort */}
                        <div className="flex items-center justify-between mb-6 gap-4 bg-white rounded-2xl shadow-md p-4">
                            {/* Mobile Filter Button */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2.5 rounded-xl font-bold hover:from-red-600 hover:to-pink-600 transition-all duration-300"
                            >
                                <Filter size={18} />
                                Filters
                            </button>

                            {/* Results Count */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 font-medium">Found</span>
                                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-black">
                                    {filteredProducts.length}
                                </span>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e: any) => dispatch(setSortBy(e.target.value))}
                                    className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-bold text-gray-700 hover:border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all cursor-pointer"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name">Name: A to Z</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={18} />
                            </div>
                        </div>

                        {/* Mobile Filters */}
                        {showFilters && (
                            <div className="lg:hidden bg-white rounded-2xl shadow-lg p-6 mb-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                                        <Filter size={20} className="text-red-600" />
                                        Filter Products
                                    </h3>
                                    <button
                                        onClick={() => setShowFilters(false)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="space-y-2 mb-6">
                                    {categories.map(category => (
                                        <label
                                            key={category.id}
                                            className={`flex items-center gap-3 cursor-pointer p-3 rounded-2xl transition-all ${selectedCategory === category.id
                                                    ? 'bg-gradient-to-r from-red-50 to-pink-50'
                                                    : 'hover:bg-gray-50'
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedCategory === category.id}
                                                onChange={() => handleCategoryChange(category.id)}
                                                className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                                            />
                                            {/* <span className="text-2xl">{category.icon}</span> */}
                                            <span className="text-sm font-bold flex-1">{category.name}</span>
                                        </label>
                                    ))}
                                </div>

                                <button
                                    onClick={handleResetFilters}
                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors"
                                >
                                    Reset Filters
                                </button>
                            </div>
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

                        {/* Products Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 lg:py-24 bg-white rounded-3xl shadow-lg">
                                <div className="text-6xl lg:text-7xl mb-6">📦</div>
                                <h3 className="text-2xl lg:text-3xl font-black mb-3 text-gray-900">No products found</h3>
                                <p className="text-gray-600 mb-8 text-lg font-medium">
                                    Try adjusting your filters to see more results
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
        </div>
    );
};

export default ProductsPage;