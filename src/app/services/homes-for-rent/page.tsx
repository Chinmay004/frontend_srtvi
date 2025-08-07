'use client';

import Navbar from "@/component/layout/Navbar";
import Footer from "@/component/layout/Footer";
import Image from "next/image";
import Inquiry from "@/component/Inquiry";

export default function HomesForRentPage() {
    const serviceData = {
        icon: "/services/home.png",
        title: "Homes for Rent",
        desc: "Find your perfect rental home with our comprehensive selection of residential properties. Whether you're looking for a short-term lease or long-term rental, we have options to suit every lifestyle and budget.",
        gradient: "from-green-500 to-teal-600"
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />

            {/* Service Card Section */}
            <section className="bg-gradient-to-r from-[#1a1a1a] via-black to-[#1a1a1a] text-white py-20 px-6 sm:px-10 lg:px-24">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
                            {serviceData.title}
                        </h1>
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                            Comprehensive real estate solutions tailored to meet your rental and lifestyle needs
                        </p>
                    </div>

                    {/* Service Card */}
                    <div className="relative group bg-[#121212] p-8 rounded-2xl border border-[#262626] hover:border-[#e0b973] transition-all duration-300 hover:shadow-2xl hover:shadow-[#e0b973]/10 max-w-2xl mx-auto">
                        {/* Gradient overlay on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${serviceData.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Image src={serviceData.icon} alt={serviceData.title} width={32} height={32} className="group-hover:scale-110 transition-transform duration-300" />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-white group-hover:text-[#e0b973] transition-colors duration-300">
                                    {serviceData.title}
                                </h3>
                                <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                    {serviceData.desc}
                                </p>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute top-4 right-4 w-2 h-2 bg-[#e0b973] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inquiry Form Section */}
            <section className="bg-[#0f0f0f] text-white py-16 px-6 sm:px-10 lg:px-24">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold mb-4">Find Your Perfect Rental</h2>
                        <p className="text-gray-300">Fill out the form below and our team will help you find the perfect rental property.</p>
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