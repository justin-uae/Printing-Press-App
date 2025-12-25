import React, { useState, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

const ContactPage: React.FC = () => {
    const phoneNumber = import.meta.env.VITE_CONTACT_NUMBER;
    const phoneNumberSecond = import.meta.env.VITE_CONTACT_NUMBER_SECOND;
    const pressEmail = import.meta.env.VITE_COMPANY_EMAIL;

    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [responseMessage, setResponseMessage] = useState('');
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        // Get reCAPTCHA token
        const recaptchaToken = recaptchaRef.current?.getValue();

        if (!recaptchaToken) {
            setFormStatus('error');
            setResponseMessage('Please complete the reCAPTCHA verification.');
            return;
        }

        setFormStatus('loading');
        setResponseMessage('');

        try {
            const appURL = import.meta.env.VITE_APP_URL;

            // Send form data to PHP backend
            const response = await fetch(`${appURL}/api/contact.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    recaptchaToken: recaptchaToken
                })
            });

            const result = await response.json();

            if (result.success) {
                setFormStatus('success');
                setResponseMessage(result.message || 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
                // Reset reCAPTCHA
                recaptchaRef.current?.reset();
            } else {
                setFormStatus('error');
                setResponseMessage(result.message || 'Something went wrong. Please try again or contact us directly.');
                // Reset reCAPTCHA on error
                recaptchaRef.current?.reset();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormStatus('error');
            setResponseMessage('Network error. Please check your connection and try again.');
            recaptchaRef.current?.reset();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-orange-500 to-orange-500 text-white py-20 lg:py-28 overflow-hidden">
                <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white opacity-10" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-block bg-white text-orange-600 px-6 py-3 rounded-2xl font-black text-sm mb-6 shadow-lg">
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
                                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                                    <MapPin size={28} className="text-white" />
                                </div>
                                <h3 className="text-xl font-black mb-3 text-gray-900">Visit Us</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    DBX Print & Design<br />
                                    Exchange Tower, Business Bay, Dubai, UAE
                                </p>
                            </div>

                            {/* Phone */}
                            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-xl p-6 lg:p-8 transition-all duration-300 hover:-translate-y-1">
                                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                                    <Phone size={28} className="text-white" />
                                </div>
                                <h3 className="text-xl font-black mb-3 text-gray-900">Call Us</h3>
                                <a href={`tel:+${phoneNumber}`} className="text-orange-600 hover:text-orange-700 font-black text-lg transition-colors">
                                    +{phoneNumber}
                                </a>
                                <br />
                                <a href={`tel:+${phoneNumberSecond}`} className="text-orange-600 hover:text-orange-700 font-black text-lg transition-colors">
                                    +{phoneNumberSecond}
                                </a>
                                <p className="text-sm text-gray-500 mt-2 font-medium">Mon-Sat, 9AM-6PM</p>
                            </div>

                            {/* Email */}
                            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-xl p-6 lg:p-8 transition-all duration-300 hover:-translate-y-1">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                                    <Mail size={28} className="text-white" />
                                </div>
                                <h3 className="text-xl font-black mb-3 text-gray-900">Email Us</h3>
                                <a href={`mailto:${pressEmail}`} className="text-orange-600 hover:text-orange-700 font-bold break-all transition-colors">
                                    {pressEmail}
                                </a>
                                <p className="text-sm text-gray-500 mt-2 font-medium">Reply within 24 hours</p>
                            </div>

                            {/* Working Hours */}
                            <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-3xl shadow-lg p-6 lg:p-8">
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-md">
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
                                        <span className="font-black text-orange-600">Closed</span>
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
                                            disabled={formStatus === 'loading'}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                                                disabled={formStatus === 'loading'}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                                                disabled={formStatus === 'loading'}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                placeholder="+971 XX XXX XXXX"
                                            />
                                        </div>
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
                                            disabled={formStatus === 'loading'}
                                            rows={6}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all resize-none font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            placeholder="Tell us about your printing needs..."
                                        />
                                    </div>

                                    {/* reCAPTCHA v2 */}
                                    <div className="flex justify-center">
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                            theme="light"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={formStatus === 'loading'}
                                        className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white font-black py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {formStatus === 'loading' ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                Sending Message...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                Send Message
                                            </>
                                        )}
                                    </button>

                                    {/* reCAPTCHA Notice */}
                                    <p className="text-xs text-gray-500 text-center font-medium">
                                        This site is protected by reCAPTCHA and the Google{' '}
                                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 font-bold">
                                            Privacy Policy
                                        </a>{' '}
                                        and{' '}
                                        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 font-bold">
                                            Terms of Service
                                        </a>{' '}
                                        apply.
                                    </p>
                                </form>

                                {/* Status Messages */}
                                {formStatus === 'success' && (
                                    <div className="mt-6 p-5 bg-green-50 border-2 border-green-200 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-6 h-6 text-green-600" />
                                            <p className="text-green-700 font-bold text-base">
                                                {responseMessage}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {formStatus === 'error' && (
                                    <div className="mt-6 p-5 bg-orange-50 border-2 border-orange-200 rounded-xl">
                                        <p className="text-orange-700 font-bold text-base">
                                            ❌ {responseMessage}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Quick Contact Options */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <a href={`tel:+${phoneNumber}`}
                                    className="group bg-white rounded-3xl shadow-lg hover:shadow-xl p-6 lg:p-8 transition-all duration-300 text-center hover:-translate-y-1"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                                        <Phone size={32} className="text-white" />
                                    </div>
                                    <h4 className="font-black text-lg mb-2 text-gray-900">Call Now</h4>
                                    <p className="text-sm text-gray-600 font-medium">Speak to our team</p>
                                </a>

                                <a href={`mailto:${pressEmail}`}
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
        </div>
    );
};

export default ContactPage;