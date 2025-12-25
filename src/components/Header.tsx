import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, X, Phone, ChevronDown, MessageCircle } from 'lucide-react';
import { toggleMobileMenu, closeMobileMenu } from '../store/slices/uiSlice';
// import { selectCartTotalItems } from '../store/slices/cartSlice';
import type { RootState } from '../types';
import { useCategories } from '../hooks/useCategories';
import Logo from '../assets/Logo.png'

const Header: React.FC = () => {
  const dispatch = useDispatch();
  // const cartItems = useSelector(selectCartTotalItems);
  const isMobileMenuOpen = useSelector((state: RootState) => state.ui.isMobileMenuOpen);
  const categories = useCategories()
  const phoneNumber = import.meta.env.VITE_CONTACT_NUMBER;
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Main Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group" onClick={() => dispatch(closeMobileMenu())}>
              {/* Logo Image */}
              <img
                src={Logo}
                alt="UAE Luxury Car Hire Logo"
                className="h-8 sm:h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              {/* Brand Text */}
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
            <div className="flex items-center gap-2 sm:gap-3">
              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>WhatsApp Us</span>
              </a>

              {/* Cart Button */}
              {/* <button
                onClick={() => dispatch(toggleCart())}
                className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
              >
                <ShoppingCart size={20} className="text-gray-700 group-hover:text-orange-600 transition-colors" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-black shadow-lg">
                    {cartItems > 9 ? '9+' : cartItems}
                  </span>
                )}
              </button> */}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => dispatch(toggleMobileMenu())}
                className="lg:hidden p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-gray-700" />
                ) : (
                  <Menu size={24} className="text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-1">
            <Link
              to="/"
              onClick={() => dispatch(closeMobileMenu())}
              className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-bold rounded-xl transition-all duration-200"
            >
              <span>Home</span>
            </Link>
            <Link
              to="/products"
              onClick={() => dispatch(closeMobileMenu())}
              className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-bold rounded-xl transition-all duration-200"
            >
              <span>All Products</span>
            </Link>

            {/* Collapsible Categories in Mobile */}
            <div className="space-y-1">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-bold rounded-xl transition-all duration-200"
              >
                <span>Categories</span>
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Collapsible category list */}
              <div
                className={`overflow-hidden transition-all duration-300 ${isCategoryOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
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

            <Link
              to="/about"
              onClick={() => dispatch(closeMobileMenu())}
              className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-bold rounded-xl transition-all duration-200"
            >
              <span>About Us</span>
            </Link>
            <Link
              to="/contact"
              onClick={() => dispatch(closeMobileMenu())}
              className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-bold rounded-xl transition-all duration-200"
            >
              <span>Contact</span>
            </Link>

            {/* Mobile CTA */}
            <div className="pt-4 mt-4 border-t space-y-3">
              <a
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-black py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                <MessageCircle size={18} />
                <span>WhatsApp Us</span>
              </a>

              <a href={`tel:${phoneNumber}`}
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-orange-500 text-white font-black py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                <Phone size={18} />
                <span>Call Us Now</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;