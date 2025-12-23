import React from 'react';
import { Award, Users, Target, Zap, Star, TrendingDown, Clock, Shield } from 'lucide-react';

const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-red-500 to-pink-500 text-white py-20 lg:py-28 overflow-hidden">
                {/* Decorative shapes */}
                <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-white opacity-10" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-block bg-white text-red-600 px-6 py-3 rounded-2xl font-black text-sm mb-6 shadow-lg">
                        TRUSTED BY THOUSANDS
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">About Dubai Print & Design</h1>
                    <p className="text-xl lg:text-2xl max-w-3xl mx-auto font-medium">
                        Your trusted partner for professional printing services in UAE
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">Our Story</h2>
                            <div className="w-24 h-1.5 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full"></div>
                        </div>
                        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                            <p className="text-xl font-bold text-red-600 bg-red-50 border-l-4 border-red-500 pl-6 py-4 rounded-r-2xl">
                                "Quality printing shouldn't cost a fortune. That's the principle we built our business on."
                            </p>
                            <p className="font-medium">
                                Dubai Print & Design has been at the forefront of professional printing services in the UAE,
                                delivering exceptional quality at unbelievable prices. We understand that businesses
                                and individuals need high-quality printed materials without breaking the bank.
                            </p>
                            <p className="font-medium">
                                Our mission is simple: provide premium printing services at prices that seem too good
                                to be true, but are absolutely real. From business cards to large format printing, we
                                handle every project with the same dedication to quality and customer satisfaction.
                            </p>
                            <p className="font-medium">
                                With state-of-the-art printing technology and a team of experienced professionals,
                                we've become the go-to printing service for businesses across the UAE.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                            The principles that guide everything we do
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Award,
                                title: 'Quality First',
                                description: 'We never compromise on quality. Every print job meets our strict standards.',
                                gradient: 'from-yellow-400 to-orange-500',
                                bg: 'from-yellow-50 to-orange-50'
                            },
                            {
                                icon: Users,
                                title: 'Customer Focus',
                                description: 'Your satisfaction is our priority. We go above and beyond for every client.',
                                gradient: 'from-blue-400 to-purple-500',
                                bg: 'from-blue-50 to-purple-50'
                            },
                            {
                                icon: Zap,
                                title: 'Speed & Efficiency',
                                description: 'Fast turnaround times without sacrificing quality. Express options available.',
                                gradient: 'from-purple-400 to-pink-500',
                                bg: 'from-purple-50 to-pink-50'
                            },
                            {
                                icon: Target,
                                title: 'Affordable Pricing',
                                description: 'Unbelievable prices that don\'t compromise on quality. Best value guaranteed.',
                                gradient: 'from-red-400 to-pink-500',
                                bg: 'from-red-50 to-pink-50'
                            }
                        ].map((value, idx) => (
                            <div key={idx} className={`group bg-gradient-to-br ${value.bg} p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                                <div className={`w-20 h-20 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md`}>
                                    <value.icon size={36} className="text-white" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-xl font-black mb-3 text-gray-900 text-center">{value.title}</h3>
                                <p className="text-gray-700 leading-relaxed text-center font-medium">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <section className="py-16 lg:py-24 bg-gradient-to-r from-red-500 to-pink-500 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-yellow-300 rounded-full"></div>
                    <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                        {[
                            { value: '10,000+', label: 'Happy Clients' },
                            { value: '1M+', label: 'Products Printed' },
                            { value: '50+', label: 'Product Types' },
                            { value: '24/7', label: 'Online Support' }
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center group">
                                <div className="text-5xl lg:text-6xl font-black mb-3 group-hover:scale-110 transition-transform">
                                    {stat.value}
                                </div>
                                <div className="text-lg lg:text-xl font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                            Why Businesses Trust Us
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
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
                                bg: 'from-yellow-50 to-orange-50'
                            },
                            {
                                icon: Clock,
                                title: 'Quick Turnaround',
                                description: 'Standard orders delivered in 1-2 business days. Need it faster? Our express service can deliver your prints in just 6 hours!',
                                gradient: 'from-blue-400 to-purple-500',
                                bg: 'from-blue-50 to-purple-50'
                            },
                            {
                                icon: TrendingDown,
                                title: 'Incredible Pricing',
                                description: 'Our prices are truly unbelievable! Get professional business cards from 37 AED, flyers from 46 AED, and much more.',
                                gradient: 'from-red-400 to-pink-500',
                                bg: 'from-red-50 to-pink-50'
                            },
                            {
                                icon: Shield,
                                title: 'Quality Guaranteed',
                                description: 'Every print job is carefully inspected before delivery. We stand behind our work with a 100% satisfaction guarantee.',
                                gradient: 'from-green-400 to-teal-500',
                                bg: 'from-green-50 to-teal-50'
                            }
                        ].map((item, idx) => (
                            <div key={idx} className={`group bg-gradient-to-br ${item.bg} p-8 lg:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                                <div className="flex items-start gap-6">
                                    <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
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
        </div>
    );
};

export default AboutPage;