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

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#0a0a0a] via-black to-[#1a1a1a] text-white py-24 px-6 sm:px-10 lg:px-24 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-green-500 to-teal-600 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Main Content */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Text Content */}
                        <div className="space-y-8">
                            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">
                                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                                    <Image src={serviceData.icon} alt="Home Icon" width={20} height={20} className="filter brightness-0" />
                                </div>
                                <span className="text-sm font-semibold tracking-wider uppercase">Premium Service</span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                                Find Your
                                <span className="block bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">
                                    Perfect Rental
                                </span>
                            </h1>

                            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                                {serviceData.desc}
                            </p>

                            {/* Stats */}
                            {/* <div className="grid grid-cols-3 gap-6 pt-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-500">300+</div>
                                    <div className="text-sm text-gray-400">Rental Properties</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-500">40+</div>
                                    <div className="text-sm text-gray-400">Locations</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-500">Flexible</div>
                                    <div className="text-sm text-gray-400">Lease Terms</div>
                                </div>
                            </div> */}
                        </div>

                        {/* Right Column - Service Card */}
                        <div className="relative group">
                            <div className="relative bg-gradient-to-br from-[#111111] to-[#1a1a1a] p-8 rounded-3xl border border-[#262626] hover:border-green-500 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 overflow-hidden">
                                {/* Background Image with Enhanced Effects */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-20 transition-all duration-500 rounded-3xl scale-105 group-hover:scale-110"
                                    style={{
                                        backgroundImage: 'url(/serviceimage/HomeforRent.png)',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                ></div>

                                {/* Enhanced Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${serviceData.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-all duration-500`}></div>

                                {/* Content */}
                                <div className="relative z-10 text-center space-y-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-all duration-500 mx-auto shadow-lg shadow-green-500/25">
                                        <Image src={serviceData.icon} alt="Home Icon" width={40} height={40} className="filter brightness-0" />
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-green-500 transition-colors duration-300">
                                            Flexible Rentals
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                            Wide range of rental options with flexible terms, premium amenities, and prime locations
                                        </p>
                                    </div>

                                    {/* Enhanced Decorative Elements */}
                                    <div className="absolute top-6 right-6 w-3 h-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                                    <div className="absolute bottom-6 left-6 w-2 h-2 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"></div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full opacity-20 animate-bounce"></div>
                            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            {/* <section className="bg-[#0f0f0f] text-white py-20 px-6 sm:px-10 lg:px-24">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Why Choose Our Rentals?</h2>
                        <p className="text-gray-400 text-lg">Experience the difference with our premium rental services</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "🏠",
                                title: "Flexible Terms",
                                desc: "Short-term and long-term rental options with customizable lease agreements"
                            },
                            {
                                icon: "💰",
                                title: "Competitive Rates",
                                desc: "Affordable rental prices with transparent costs and no hidden fees"
                            },
                            {
                                icon: "🔍",
                                title: "Quick Process",
                                desc: "Streamlined application process with fast approval and move-in dates"
                            }
                        ].map((feature, index) => (
                            <div key={index} className="group bg-[#111111] rounded-2xl border border-[#262626] p-8 hover:border-green-500 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-3 group-hover:text-green-500 transition-colors duration-300">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Inquiry Form Section */}
            <section className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] text-white py-20 px-6 sm:px-10 lg:px-24">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Ready to Find Your Perfect Rental?</h2>
                        <p className="text-gray-300 text-lg">Get in touch with our experts and start your rental journey today</p>
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