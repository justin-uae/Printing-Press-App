import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {

    const phoneNumber = import.meta.env.VITE_CONTACT_NUMBER;
    const pressEmail = import.meta.env.VITE_COMPANY_EMAIL;

    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-gradient-to-br from-red-500 to-pink-500 w-12 h-12 flex items-center justify-center rounded-2xl font-black text-xl shadow-lg">
                                DP
                            </div>
                            <div>
                                <h3 className="text-xl font-black">Dubai Print & Design</h3>
                                <p className="text-xs text-gray-400 font-medium">Printing Excellence</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm font-medium mb-4">
                            Professional printing services in UAE at unbelievable prices.
                        </p>

                        {/* Social Media */}
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-xl flex items-center justify-center transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-xl flex items-center justify-center transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-xl flex items-center justify-center transition-all">
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
                                <MapPin size={16} className="text-red-500" />
                                <span className="font-medium">
                                    Exchange Tower, Business Bay, Dubai, UAE</span>
                            </li>
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <Phone size={16} className="text-red-500" />
                                <a href={`tel:+${phoneNumber}`} className="hover:text-white transition-colors font-medium">
                                    +{phoneNumber}
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <Mail size={16} className="text-red-500" />
                                <a href={`mailto:${pressEmail}`} className="hover:text-white transition-colors font-medium break-all">
                                    {pressEmail}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-center items-center gap-4">
                    <p className="text-sm text-gray-400 font-medium flex items-center gap-2">
                        © {new Date().getFullYear()} Dubai Print & Design.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;