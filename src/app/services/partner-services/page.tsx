'use client';

import Navbar from "@/component/layout/Navbar";
import Footer from "@/component/layout/Footer";
import Image from "next/image";
import Inquiry from "@/component/Inquiry";

export default function PartnerServicesPage() {
    const partnerServices = [
        {
            icon: "/services/Build.png",
            title: "Property Management",
            desc: "Comprehensive property management solutions tailored to maximize your investment returns includes tenant screening, rent collection, maintenance, and inspections, ensuring your property stays well-kept, profitable, and in good hands—backed by transparent reporting and 24/7 support.",
            gradient: "from-blue-500 to-cyan-600",
            bgImage: "/serviceimage/PropertyManagement.png"
        },
        {
            icon: "/services/hand.png",
            title: "Mortgage Services",
            desc: "Expert advice and financing solutions to secure the best terms for your property. We work with top banks to find competitive rates, guide you from pre-approval to closing, and simplify the process for first-time buyers and seasoned investors alike.",
            gradient: "from-green-500 to-emerald-600",
            bgImage: "/serviceimage/MortgageService.png"
        },
        {
            icon: "/services/money.png",
            title: "Home Valuation",
            desc: "Accurate market assessments for residential and commercial properties. Our certified experts use advanced analysis and data to deliver precise valuations for buying, selling, refinancing, or insurance—complete with market trends, comparisons, and future projections.",
            gradient: "from-purple-500 to-pink-600",
            bgImage: "/serviceimage/HomeValuation.png"
        }
    ];

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#0a0a0a] via-black to-[#1a1a1a] text-white py-24 px-6 sm:px-10 lg:px-24 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-orange-500 to-red-600 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Main Content */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Text Content */}
                        <div className="space-y-8">
                            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
                                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                                    <Image src="/services/money.png" alt="Partner Icon" width={20} height={20} className="filter brightness-0" />
                                </div>
                                <span className="text-sm font-semibold tracking-wider uppercase">Premium Partners</span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                                Expert
                                <span className="block bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
                                    Partner Services
                                </span>
                            </h1>

                            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                                Access specialized real estate services through our trusted partner network. From property management and maintenance to legal services and financing solutions, we connect you with industry experts.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 pt-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-500">50+</div>
                                    <div className="text-sm text-gray-400">Expert Partners</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-500">15+</div>
                                    <div className="text-sm text-gray-400">Service Categories</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-500">24/7</div>
                                    <div className="text-sm text-gray-400">Support Available</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Service Preview */}
                        <div className="relative group">
                            <div className="relative bg-gradient-to-br from-[#111111] to-[#1a1a1a] p-8 rounded-3xl border border-[#262626] hover:border-yellow-500 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/20 overflow-hidden">
                                {/* Background Image with Enhanced Effects */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-20 transition-all duration-500 rounded-3xl scale-105 group-hover:scale-110"
                                    style={{
                                        backgroundImage: 'url(/serviceimage/PartnerServices.png)',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                ></div>

                                {/* Enhanced Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-600 opacity-0 group-hover:opacity-10 rounded-3xl transition-all duration-500"></div>

                                {/* Content */}
                                <div className="relative z-10 text-center space-y-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-all duration-500 mx-auto shadow-lg shadow-yellow-500/25">
                                        <Image src="/services/money.png" alt="Partner Icon" width={40} height={40} className="filter brightness-0" />
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-yellow-500 transition-colors duration-300">
                                            Trusted Network
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                            Curated network of industry experts providing specialized services for all your real estate needs
                                        </p>
                                    </div>

                                    {/* Enhanced Decorative Elements */}
                                    <div className="absolute top-6 right-6 w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                                    <div className="absolute bottom-6 left-6 w-2 h-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"></div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full opacity-20 animate-bounce"></div>
                            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partner Services Section */}
            <section className="bg-[#0f0f0f] text-white py-20 px-6 sm:px-10 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Premium Partner Services</h2>
                        <p className="text-gray-400 text-lg">Comprehensive solutions from trusted industry experts</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {partnerServices.map((service) => (
                            <div
                                key={service.title}
                                className="relative group bg-[#111111] p-8 rounded-2xl border border-[#262626] hover:border-yellow-500 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10 overflow-hidden"
                            >
                                {/* Background Image with Enhanced Effects */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-15 transition-all duration-300 rounded-2xl scale-105 group-hover:scale-110"
                                    style={{
                                        backgroundImage: `url(${service.bgImage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                ></div>

                                {/* Enhanced Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-300`}></div>

                                <div className="relative z-10 text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                                        <Image src={service.icon} alt={service.title} width={32} height={32} className="group-hover:scale-110 transition-transform duration-300" />
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-white group-hover:text-yellow-500 transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                            {service.desc}
                                        </p>
                                    </div>

                                    {/* Enhanced Decorative Elements */}
                                    <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Inquiry Form Section */}
            <section className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] text-white py-20 px-6 sm:px-10 lg:px-24">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Ready to Access Expert Partner Services?</h2>
                        <p className="text-gray-300 text-lg">Get in touch with our team and connect with the right experts today</p>
                    </div>

                    <div className="bg-gradient-to-br from-[#111111] to-[#1a1a1a] rounded-3xl border border-[#262626] p-8 shadow-2xl shadow-black/50">
                        <Inquiry />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
} 