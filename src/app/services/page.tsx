'use client';

import Navbar from "@/component/layout/Navbar";
import Footer from "@/component/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const IMAGE_BASE_URL = "https://oss.pixxicrm.com";

interface Listing {
    id: string;
    title: string;
    description: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    type: string;
    price: number;
    images: string[];
}

interface PixxiApiProperty {
    propertyId: string;
    title: string;
    description: string;
    region: string;
    bedroomMax?: number;
    rentParam?: {
        bathrooms?: number;
    };
    propertyType?: string[];
    price: number;
    photos?: string[];
}

export default function OurServicesPage() {
    const [related, setRelated] = useState<Listing[]>([]);

    useEffect(() => {
        const fetchFeaturedListings = async () => {
            try {
                const res = await fetch("https://dataapi.pixxicrm.ae/pixxiapi/v1/properties/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-PIXXI-TOKEN": "GwoU8j7WFPwaAUfCz7B6NAHFwMBaSLak",
                    },
                    body: JSON.stringify({ page: 1, size: 3 }),
                });

                const data = await res.json();

                const mappedListings = (data.data.list as PixxiApiProperty[] || []).map((item) => ({
                    id: item.propertyId,
                    title: item.title,
                    description: item.description,
                    location: item.region,
                    bedrooms: item?.bedroomMax || 0,
                    bathrooms: item?.rentParam?.bathrooms || 0,
                    type: item?.propertyType?.[0] || "N/A",
                    price: item.price,
                    images: item.photos?.map((img) =>
                        img.startsWith("http") ? img : `${IMAGE_BASE_URL}${img}`
                    ) || [],
                }));

                setRelated(mappedListings);
            } catch (error) {
                console.error("Error fetching featured listings:", error);
            }
        };

        fetchFeaturedListings();
    }, []);

    const services = [
        {
            icon: "/services/home.png",
            title: "Homes for Sale",
            desc: "Discover your dream home with our extensive collection of residential properties. From cozy apartments to luxury villas, we offer a wide range of homes for sale across Dubai's most desirable locations.",
            gradient: "from-blue-500 to-purple-600",
            link: "/services/homes-for-sale"
        },
        {
            icon: "/services/home.png",
            title: "Homes for Rent",
            desc: "Find your perfect rental home with our comprehensive selection of residential properties. Whether you're looking for a short-term lease or long-term rental, we have options to suit every lifestyle and budget.",
            gradient: "from-green-500 to-teal-600",
            link: "/services/homes-for-rent"
        },
        {
            icon: "/services/hand.png",
            title: "Commercial for Sale",
            desc: "Invest in Dubai's thriving commercial real estate market. We offer premium office spaces, retail units, and commercial properties for sale in prime business districts and emerging markets.",
            gradient: "from-orange-500 to-red-600",
            link: "/services/commercial-for-sale"
        },
        {
            icon: "/services/Build.png",
            title: "Commercial for Rent",
            desc: "Secure your ideal workspace in Dubai's most strategic locations. We provide high-quality office spaces, retail units, and commercial properties for rent—perfect for startups, SMEs, and established businesses looking to grow in the UAE's dynamic market.",
            gradient: "from-purple-500 to-pink-600",
            link: "/services/commercial-for-rent"
        },
        {
            icon: "/services/money.png",
            title: "Partner Services",
            desc: "Access specialized real estate services through our trusted partner network. From property management and maintenance to legal services and financing solutions, we connect you with industry experts.",
            gradient: "from-yellow-500 to-orange-600",
            link: "/services/partner-services"
        },
    ];

    return (
        <div className="bg-black text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#0a0a0a] via-black to-[#1a1a1a] text-white py-24 px-6 sm:px-10 lg:px-24 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#e0b973] to-[#f4d03f] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#e0b973] to-[#f4d03f] bg-clip-text text-transparent mb-6">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#e0b973] to-[#f4d03f] rounded-lg flex items-center justify-center">
                                <Image src="/services/home.png" alt="Services Icon" width={20} height={20} className="filter brightness-0" />
                            </div>
                            <span className="text-sm font-semibold tracking-wider uppercase">Premium Services</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                            Our
                            <span className="block bg-gradient-to-r from-[#e0b973] to-[#f4d03f] bg-clip-text text-transparent">
                                Services
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Comprehensive real estate solutions tailored to meet your investment and lifestyle needs
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="bg-[#0f0f0f] text-white py-20 px-6 sm:px-10 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={service.title}
                                className={`relative group bg-[#111111] p-8 rounded-2xl border border-[#262626] hover:border-[#e0b973] transition-all duration-500 hover:shadow-2xl hover:shadow-[#e0b973]/20 overflow-hidden ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''} ${service.link ? "cursor-pointer" : ""}`}
                            >
                                {service.link ? (
                                    <Link href={service.link} className="block">
                                        {/* Enhanced Gradient Overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-500`}></div>

                                        <div className="relative z-10 flex flex-col justify-center">
                                            <div className="w-full flex justify-center items-center">
                                                <div className="w-16 h-16 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center rounded-xl mb-6 group-hover:scale-110 transition-transform duration-500">
                                                    <Image src={service.icon} alt={service.title} width={32} height={32} className="group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                            </div>

                                            <div className="space-y-4 flex-col justify-center items-center flex text-center">
                                                <h3 className="text-xl font-bold text-white group-hover:text-[#e0b973] transition-colors duration-300">
                                                    {service.title}
                                                </h3>
                                                <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                                    {service.desc}
                                                </p>
                                            </div>

                                            {/* Enhanced Decorative Elements */}
                                            <div className="absolute top-4 right-4 w-3 h-3 bg-[#e0b973] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                                        </div>
                                    </Link>
                                ) : (
                                    <>
                                        {/* Enhanced Gradient Overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-500`}></div>

                                        <div className="relative z-10 flex">
                                            <div className="w-16 h-16 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center rounded-xl mb-6 group-hover:scale-110 transition-transform duration-500">
                                                <Image src={service.icon} alt={service.title} width={32} height={32} className="group-hover:scale-110 transition-transform duration-500" />
                                            </div>

                                            <div className="space-y-4 flex border-8">
                                                <h3 className="text-xl font-bold text-white group-hover:text-[#e0b973] transition-colors duration-300">
                                                    {service.title}
                                                </h3>
                                                <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                                    {service.desc}
                                                </p>
                                            </div>

                                            {/* Enhanced Decorative Elements */}
                                            <div className="absolute top-4 right-4 w-3 h-3 bg-[#e0b973] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Properties Section */}
            <section className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] text-white py-20 px-6 sm:px-10 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Featured Properties</h2>
                        <p className="text-gray-400 text-lg">Discover our handpicked selection of premium properties</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {related.map((property) => (
                            <Link
                                key={property.id}
                                href={`/listings/${property.id}`}
                                className="group bg-[#111111] border border-[#262626] rounded-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden hover:border-[#e0b973] hover:shadow-xl hover:shadow-[#e0b973]/10"
                            >
                                <div className="relative w-full h-48">
                                    <Image
                                        src={property.images[0] || "/fallback.jpg"}
                                        alt={property.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-[#e0b973] transition-colors duration-300">{property.title}</h3>
                                    <p className="text-sm text-gray-400 line-clamp-2 mb-3">{property.description}</p>
                                    <div className="flex gap-2 text-xs mb-4">
                                        <span className="bg-[#1a1a1a] px-2 py-1 rounded border border-[#262626]">{property.bedrooms || 0} Beds</span>
                                        <span className="bg-[#1a1a1a] px-2 py-1 rounded border border-[#262626]">{property.bathrooms || 0} Baths</span>
                                        <span className="bg-[#1a1a1a] px-2 py-1 rounded border border-[#262626]">{property.type}</span>
                                    </div>
                                    <p className="font-bold text-xl text-[#e0b973]">AED {property.price.toLocaleString()}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="flex justify-center mt-12">
                        <Link href="/listings">
                            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#e0b973] to-[#f4d03f] hover:from-[#f4d03f] hover:to-[#e0b973] text-black font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#e0b973]/25 transform hover:scale-105">
                                View All Listings
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
