import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, X, ChevronDown, MessageCircle, ShoppingCart, User, LogOut, Package } from 'lucide-react';
import { toggleMobileMenu, closeMobileMenu, toggleCart } from '../store/slices/uiSlice';
import { selectCartTotalItems } from '../store/slices/cartSlice';
import { logoutUser, checkAuthStatus } from '../store/slices/authSlice';
import { useCategories } from '../hooks/useCategories';
import Logo from '../assets/Logo.png';
import type { AppDispatch, RootState } from '../store/store';

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartTotalItems);
  const isMobileMenuOpen = useSelector((state: RootState) => state.ui.isMobileMenuOpen);
  const { isAuthenticated, customerData } = useSelector((state: RootState) => state.auth);
  const categories = useCategories();
  const phoneNumber = import.meta.env.VITE_CONTACT_NUMBER;
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    setShowProfileDropdown(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Main Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group" onClick={() => dispatch(closeMobileMenu())}>
              <img
                src={Logo}
                alt="DBX Print & Design Logo"
                className="h-8 sm:h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                DBX<span className="text-orange-600"> Print & Design</span>
              </span>
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              <Link
                to="/"
                className="px-4 py-2 text-gray-700 hover:text-orange-600 font-bold transition-all duration-200 rounded-xl hover:bg-orange-50"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="px-4 py-2 text-gray-700 hover:text-orange-600 font-bold transition-all duration-200 rounded-xl hover:bg-orange-50"
              >
                Products
              </Link>

              {/* Categories Dropdown */}
              <div className="relative group">
                <button className="px-4 py-2 text-gray-700 hover:text-orange-600 font-bold transition-all duration-200 rounded-xl hover:bg-orange-50 flex items-center gap-1">
                  Categories
                  <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-60 bg-white shadow-2xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/products?category=${category.id}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-all duration-200 border-b last:border-b-0"
                    >
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">{category.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/about"
                className="px-4 py-2 text-gray-700 hover:text-orange-600 font-bold transition-all duration-200 rounded-xl hover:bg-orange-50"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 text-gray-700 hover:text-orange-600 font-bold transition-all duration-200 rounded-xl hover:bg-orange-50"
              >
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Profile / Login Section */}
              {isAuthenticated ? (
                <>
                  {/* Desktop Account Dropdown */}
                  <div className="relative hidden lg:block">
                    <button
                      onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                      className="flex items-center gap-2 px-3 xl:px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <User size={18} />
                      <span className="hidden xl:inline">{customerData?.firstName || 'My Account'}</span>
                      <span className="xl:hidden">Account</span>
                      <ChevronDown size={16} className={`transition-transform duration-300 ${showProfileDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showProfileDropdown && (
                      <div className="absolute right-0 mt-2 w-56 bg-white shadow-2xl rounded-2xl overflow-hidden z-50">
                        <Link
                          to="/profile"
                          onClick={() => setShowProfileDropdown(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-all duration-200 border-b"
                        >
                          <User size={18} className="text-orange-600" />
                          <span className="font-bold text-gray-900">My Profile</span>
                        </Link>
                        <Link
                          to="/bookings"
                          onClick={() => setShowProfileDropdown(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-all duration-200 border-b"
                        >
                          <Package size={18} className="text-orange-600" />
                          <span className="font-bold text-gray-900">My Orders</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-all duration-200 text-left"
                        >
                          <LogOut size={18} className="text-red-600" />
                          <span className="font-bold text-red-600">Logout</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Desktop Cart Icon */}
                  <button
                    onClick={() => dispatch(toggleCart())}
                    className="hidden lg:block relative p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
                  >
                    <ShoppingCart size={20} className="text-gray-700 group-hover:text-orange-600 transition-colors" />
                    {cartItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-black shadow-lg">
                        {cartItems > 9 ? '9+' : cartItems}
                      </span>
                    )}
                  </button>
                </>
              ) : (
                <div className="hidden lg:flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3 xl:px-4 py-2.5 text-gray-700 hover:text-orange-600 font-bold transition-all duration-200 rounded-xl hover:bg-orange-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 xl:px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                  <button
                    onClick={() => dispatch(toggleCart())}
                    className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
                  >
                    <ShoppingCart size={20} className="text-gray-700 group-hover:text-orange-600 transition-colors" />
                    {cartItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-black shadow-lg">
                        {cartItems > 9 ? '9+' : cartItems}
                      </span>
                    )}
                  </button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => dispatch(toggleMobileMenu())}
                className="lg:hidden p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                {isMobileMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-1">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => dispatch(closeMobileMenu())}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-bold rounded-xl transition-all duration-200"
                >
                  <User size={20} />
                  <span>My Profile</span>
                </Link>
                <Link
                  to="/bookings"
                  onClick={() => dispatch(closeMobileMenu())}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-bold rounded-xl transition-all duration-200"
                >
                  <Package size={20} />
                  <span>My Orders</span>
                </Link>
                {/* Cart in mobile dropdown */}
                <button
                  onClick={() => {
                    dispatch(closeMobileMenu());
                    dispatch(toggleCart());
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-bold rounded-xl transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart size={20} />
                    <span>My Cart</span>
                  </div>
                  {cartItems > 0 && (
                    <span className="bg-orange-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-black">
                      {cartItems > 9 ? '9+' : cartItems}
                    </span>
                  )}
                </button>
                <div className="border-t pt-2 mt-2">
                  <button
                    onClick={() => {
                      handleLogout();
                      dispatch(closeMobileMenu());
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 font-bold rounded-xl transition-all duration-200"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
                <div className="border-t pt-2 mt-2"></div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => dispatch(closeMobileMenu())}
                  className="flex items-center justify-center gap-2 w-full bg-white border-2 border-orange-500 text-orange-600 font-black py-3 px-6 rounded-2xl hover:bg-orange-50 transition-all duration-200"
                >
                  <User size={18} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  onClick={() => dispatch(closeMobileMenu())}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-orange-500 text-white font-black py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <User size={18} />
                  <span>Sign Up</span>
                </Link>
                {/* Cart Button for non-authenticated mobile users */}
                <button
                  onClick={() => {
                    dispatch(closeMobileMenu());
                    dispatch(toggleCart());
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-bold rounded-xl transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart size={20} />
                    <span>Shopping Cart</span>
                  </div>
                  {cartItems > 0 && (
                    <span className="bg-orange-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-black">
                      {cartItems > 9 ? '9+' : cartItems}
                    </span>
                  )}
                </button>
                <div className="border-t pt-2 mt-2"></div>
              </>
            )}

            {/* Rest of mobile menu items */}
            <Link to="/" onClick={() => dispatch(closeMobileMenu())} className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-bold rounded-xl transition-all duration-200">
              <span>Home</span>
            </Link>
            <Link to="/products" onClick={() => dispatch(closeMobileMenu())} className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-bold rounded-xl transition-all duration-200">
              <span>All Products</span>
            </Link>

            <div className="space-y-1">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-bold rounded-xl transition-all duration-200"
              >
                <span>Categories</span>
                <ChevronDown size={20} className={`transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${isCategoryOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-1 pl-4 pt-1">
                  {categories.map(category => (
                    <Link
                      key={category.id}
                      to={`/products?category=${category.slug}`}
                      onClick={() => dispatch(closeMobileMenu())}
                      className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200"
                    >
                      <div className="flex-1">
                        <p className="font-bold">{category.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/about" onClick={() => dispatch(closeMobileMenu())} className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-bold rounded-xl transition-all duration-200">
              <span>About Us</span>
            </Link>
            <Link to="/contact" onClick={() => dispatch(closeMobileMenu())} className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-bold rounded-xl transition-all duration-200">
              <span>Contact</span>
            </Link>

            <div className="pt-4 mt-4 border-t space-y-3">
              <a href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-black py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <MessageCircle size={18} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;