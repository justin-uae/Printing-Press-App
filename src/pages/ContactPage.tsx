import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-red-500 to-pink-500 text-white py-20 lg:py-28 overflow-hidden">
                <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white opacity-10" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-block bg-white text-red-600 px-6 py-3 rounded-2xl font-black text-sm mb-6 shadow-lg">
                        <MessageCircle size={16} className="inline mr-2" />
                        WE'RE HERE TO HELP
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">Get In Touch</h1>
                    <p className="text-xl lg:text-2xl max-w-3xl mx-auto font-medium">
                        Have a question or need a custom quote? We're here to help!
                    </p>
                </div>
            </section>

            {/* Contact Info & Form */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contact Information */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Address */}
                            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-xl p-6 lg:p-8 transition-all duration-300 hover:-translate-y-1">
                                <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                                    <MapPin size={28} className="text-white" />
                                </div>
                                <h3 className="text-xl font-black mb-3 text-gray-900">Visit Us</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    Diamond Press<br />
                                    Dubai, United Arab Emirates
                                </p>
                            </div>

                            {/* Phone */}
                            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-xl p-6 lg:p-8 transition-all duration-300 hover:-translate-y-1">
                                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                                    <Phone size={28} className="text-white" />
                                </div>
                                <h3 className="text-xl font-black mb-3 text-gray-900">Call Us</h3>
                                <a href="tel:+971XXXXXXXX" className="text-red-600 hover:text-red-700 font-black text-lg transition-colors">
                                    +971 XX XXX XXXX
                                </a>
                                <p className="text-sm text-gray-500 mt-2 font-medium">Mon-Sat, 9AM-6PM</p>
                            </div>

                            {/* Email */}
                            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-xl p-6 lg:p-8 transition-all duration-300 hover:-translate-y-1">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                                    <Mail size={28} className="text-white" />
                                </div>
                                <h3 className="text-xl font-black mb-3 text-gray-900">Email Us</h3>
                                <a href="mailto:uaediamondpp@gmail.com" className="text-red-600 hover:text-red-700 font-bold break-all transition-colors">
                                    uaediamondpp@gmail.com
                                </a>
                                <p className="text-sm text-gray-500 mt-2 font-medium">Reply within 24 hours</p>
                            </div>

                            {/* Working Hours */}
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-lg p-6 lg:p-8">
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                                    <Clock size={28} className="text-white" />
                                </div>
                                <h3 className="text-xl font-black mb-4 text-gray-900">Working Hours</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center p-3 bg-white rounded-xl font-medium">
                                        <span className="text-gray-600">Monday - Friday:</span>
                                        <span className="font-black text-gray-900">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-white rounded-xl font-medium">
                                        <span className="text-gray-600">Saturday:</span>
                                        <span className="font-black text-gray-900">9:00 AM - 2:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-white rounded-xl font-medium">
                                        <span className="text-gray-600">Sunday:</span>
                                        <span className="font-black text-red-600">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-10">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-black text-gray-900 mb-2">Send Us a Message</h2>
                                    <p className="text-gray-600 font-medium">Fill out the form below and we'll get back to you ASAP</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-black text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all font-medium"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Email & Phone */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-black text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all font-medium"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-black text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all font-medium"
                                                placeholder="+971 XX XXX XXXX"
                                            />
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-black text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all appearance-none cursor-pointer font-medium"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="quote">Request a Quote</option>
                                            <option value="order">Order Inquiry</option>
                                            <option value="support">Customer Support</option>
                                            <option value="custom">Custom Print Job</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-black text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all resize-none font-medium"
                                            placeholder="Tell us about your printing needs..."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-black py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                                    >
                                        <Send size={20} />
                                        Send Message
                                    </button>
                                </form>
                            </div>

                            {/* Quick Contact Options */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                                <a href="tel:+971XXXXXXXX"
                                    className="group bg-white rounded-3xl shadow-lg hover:shadow-xl p-6 lg:p-8 transition-all duration-300 text-center hover:-translate-y-1"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                                        <Phone size={32} className="text-white" />
                                    </div>
                                    <h4 className="font-black text-lg mb-2 text-gray-900">Call Now</h4>
                                    <p className="text-sm text-gray-600 font-medium">Speak to our team</p>
                                </a>

                                <a href="mailto:uaediamondpp@gmail.com"
                                    className="group bg-white rounded-3xl shadow-lg hover:shadow-xl p-6 lg:p-8 transition-all duration-300 text-center hover:-translate-y-1"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                                        <Mail size={32} className="text-white" />
                                    </div>
                                    <h4 className="font-black text-lg mb-2 text-gray-900">Email Us</h4>
                                    <p className="text-sm text-gray-600 font-medium">Get a quick response</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-gray-600 font-medium">Quick answers to common questions</p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-6">
                        {[
                            {
                                q: 'What are your turnaround times?',
                                a: 'Standard orders are completed in 1-2 business days. We also offer express service with delivery in as fast as 6 hours for select products.',
                                gradient: 'from-purple-50 to-pink-50'
                            },
                            {
                                q: 'What file formats do you accept?',
                                a: 'We accept PDF, AI, PSD, and high-resolution JPG/PNG files. For best results, provide PDF files with embedded fonts and images in CMYK color mode.',
                                gradient: 'from-blue-50 to-purple-50'
                            },
                            {
                                q: 'Do you offer design services?',
                                a: 'Yes! Our design team can help create custom designs for your printing needs. Contact us for a quote on design services.',
                                gradient: 'from-green-50 to-teal-50'
                            },
                            {
                                q: 'What payment methods do you accept?',
                                a: 'We accept cash, bank transfer, credit/debit cards, and online payments through our secure checkout system.',
                                gradient: 'from-red-50 to-pink-50'
                            }
                        ].map((faq, idx) => (
                            <div key={idx} className={`group bg-gradient-to-br ${faq.gradient} rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                                <h3 className="text-xl font-black mb-3 text-gray-900">{faq.q}</h3>
                                <p className="text-gray-700 leading-relaxed font-medium">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Find Us on the Map</h2>
                        <p className="text-lg text-gray-600 font-medium">Visit our location in Dubai</p>
                    </div>
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <div className="text-center text-gray-500">
                                <MapPin size={64} className="mx-auto mb-6 text-red-600" />
                                <p className="text-xl font-black text-gray-700 mb-2">Map integration coming soon</p>
                                <p className="text-sm font-medium">Dubai, United Arab Emirates</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;