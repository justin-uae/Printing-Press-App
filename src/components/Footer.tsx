import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import Logo from '../assets/Logo.png'
import { PaymentIcon } from 'react-svg-credit-card-payment-icons';

const Footer: React.FC = () => {

    const phoneNumber = import.meta.env.VITE_CONTACT_NUMBER;
    const phoneNumberSecond = import.meta.env.VITE_CONTACT_NUMBER_SECOND;
    const pressEmail = import.meta.env.VITE_COMPANY_EMAIL;
    const appURL = import.meta.env.VITE_APP_URL;

    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src={Logo}
                                loading='lazy'
                                alt="UAE Luxury Car Hire Logo"
                                className="h-8 sm:h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
                            />
                            <span className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold text-white group-hover:text-orange-600 transition-colors duration-300">
                                DBX<span className="text-orange-600"> Print & Design</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm font-medium mb-4">
                            Professional printing services in UAE at unbelievable prices.
                        </p>

                        {/* Social Media */}
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-xl flex items-center justify-center transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-xl flex items-center justify-center transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-xl flex items-center justify-center transition-all">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-black mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors font-medium text-sm">Home</Link></li>
                            <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors font-medium text-sm">Products</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors font-medium text-sm">About</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors font-medium text-sm">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-black mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <MapPin size={16} className="text-orange-500" />
                                <span className="font-medium">
                                    Exchange Tower, Business Bay, Dubai, UAE
                                </span>
                            </li>
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <MapPin size={16} className="text-orange-500" />
                                <span className="font-medium">
                                    Khalidiya Towers, M Floor, W10, Al Bateen, Khalidiyah, Abu Dhabi, UAE
                                </span>
                            </li>
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <Phone size={16} className="text-orange-500" />
                                <a href={`tel:+${phoneNumber}`} className="hover:text-white transition-colors font-medium">
                                    +{phoneNumber} / +{phoneNumberSecond}
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <Mail size={16} className="text-orange-500" />
                                <a href={`mailto:${pressEmail}`} className="hover:text-white transition-colors font-medium break-all">
                                    {pressEmail}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-6 flex justify-center items-center gap-3 sm:gap-4">
                    <span className="text-xs sm:text-sm text-gray-400 font-medium">We Accept:</span>
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Visa */}
                        <div className="rounded p-1.5 sm:p-2 shadow-lg hover:scale-105 transition-transform">
                            <PaymentIcon className="w-10 h-6 sm:w-12 sm:h-7" type="Visa" format="flatRounded" />
                        </div>
                        {/* Mastercard */}
                        <div className="rounded p-1.5 sm:p-2 shadow-lg hover:scale-105 transition-transform">
                            <PaymentIcon className="w-10 h-6 sm:w-12 sm:h-7" type="Mastercard" format="flatRounded" />

                        </div>
                        <div className="rounded p-1.5 sm:p-2 shadow-lg hover:scale-105 transition-transform">
                            <PaymentIcon className="w-10 h-6 sm:w-12 sm:h-7" type="Americanexpress" format="flatRounded" />

                        </div>
                    </div>
                </div>
                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-center items-center gap-4">
                    <p className="text-sm text-gray-400 font-medium flex items-center gap-2">
                        © {new Date().getFullYear()}
                        <a className='text-orange-600' href={appURL} target='_blank'>
                            DBX Print & Design
                        </a>
                        is a trading style of DBX Signage For Promotional Gifts Preparing LLC.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;