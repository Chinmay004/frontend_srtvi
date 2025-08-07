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
            desc: "Comprehensive property management solutions tailored to maximize your investment returns. Our expert team handles tenant screening, rent collection, maintenance coordination, and property inspections. We ensure your property is well-maintained, occupied by quality tenants, and generating optimal rental income. From single properties to large portfolios, we provide personalized management services with transparent reporting and 24/7 support.",
            gradient: "from-blue-500 to-cyan-600"
        },
        {
            icon: "/services/hand.png",
            title: "Mortgage Services",
            desc: "Expert mortgage advisory and financing solutions to help you secure the best possible terms for your property purchase. Our experienced mortgage specialists work with leading banks and financial institutions to find competitive rates and flexible payment plans. We guide you through the entire mortgage process, from pre-approval to closing, ensuring you understand all terms and conditions. Whether you're a first-time buyer or an experienced investor, we help you navigate complex financing options and secure the most favorable mortgage terms for your dream property.",
            gradient: "from-green-500 to-emerald-600"
        },
        {
            icon: "/services/money.png",
            title: "Home Valuation",
            desc: "Professional property valuation services providing accurate market assessments for residential and commercial properties. Our certified valuers use advanced market analysis tools and comprehensive data to deliver precise property valuations. Whether you're buying, selling, refinancing, or need insurance purposes, our detailed valuation reports include market trends, comparable sales analysis, and future value projections. Get expert insights into your property's current market value and potential appreciation with our thorough evaluation process.",
            gradient: "from-purple-500 to-pink-600"
        }
    ];

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />

            {/* Header Section */}
            <section className="bg-gradient-to-r from-[#1a1a1a] via-black to-[#1a1a1a] text-white py-20 px-6 sm:px-10 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
                            Partner Services
                        </h1>
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                            Access specialized real estate services through our trusted partner network. From property management and maintenance to legal services and financing solutions, we connect you with industry experts.
                        </p>
                    </div>

                    {/* Partner Services Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {partnerServices.map((service) => (
                            <div
                                key={service.title}
                                className="relative group bg-[#121212] p-8 rounded-2xl border border-[#262626] hover:border-[#e0b973] transition-all duration-300 hover:shadow-2xl hover:shadow-[#e0b973]/10"
                            >
                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>

                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Image src={service.icon} alt={service.title} width={32} height={32} className="group-hover:scale-110 transition-transform duration-300" />
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-white group-hover:text-[#e0b973] transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                            {service.desc}
                                        </p>
                                    </div>

                                    {/* Decorative element */}
                                    <div className="absolute top-4 right-4 w-2 h-2 bg-[#e0b973] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Inquiry Form Section */}
            <section className="bg-[#0f0f0f] text-white py-16 px-6 sm:px-10 lg:px-24">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold mb-4">Get Expert Partner Services</h2>
                        <p className="text-gray-300">Fill out the form below and our team will connect you with the right partner services for your needs.</p>
                    </div>

                    <div className="bg-[#111111] rounded-2xl border border-[#262626] p-8">
                        <Inquiry />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
} 