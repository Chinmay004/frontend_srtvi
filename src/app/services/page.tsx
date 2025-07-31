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

    return (
        <div className="bg-black text-white">
            <Navbar />

            {/* Services Section */}
            <section className="bg-gradient-to-r from-[#1a1a1a] via-black to-[#1a1a1a] text-white py-20 px-6 sm:px-10 lg:px-24">
                <h2 className="text-4xl sm:text-5xl font-semibold text-center mb-16 tracking-tight">
                    Our Services
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto ">
                    {[
                        {
                            icon: "/services/home.png",
                            title: "Homes for Sale",
                            desc: "Discover your dream home with our extensive collection of residential properties. From cozy apartments to luxury villas, we offer a wide range of homes for sale across Dubai's most desirable locations."
                        },
                        {
                            icon: "/services/home.png",
                            title: "Homes for Rent",
                            desc: "Find your perfect rental home with our comprehensive selection of residential properties. Whether you're looking for a short-term lease or long-term rental, we have options to suit every lifestyle and budget."
                        },
                        {
                            icon: "/services/hand.png",
                            title: "Commercial for Sale",
                            desc: "Invest in Dubai's thriving commercial real estate market. We offer premium office spaces, retail units, and commercial properties for sale in prime business districts and emerging markets."
                        },
                        // {
                        //     icon: "/services/Build.png",
                        //     title: "Commercial for Rent",
                        //     desc: "Secure the perfect commercial space for your business. Our portfolio includes office buildings, retail spaces, warehouses, and industrial properties available for lease across Dubai."
                        // },
                        {
                            icon: "/services/money.png",
                            title: "External Services through Partner Channel",
                            desc: "Access specialized real estate services through our trusted partner network. From property management and maintenance to legal services and financing solutions, we connect you with industry experts."
                        },
                    ].map((service) => (
                        <div key={service.title} className="flex flex-col bg-[#121212] p-6 rounded-xl border border-[#262626] hover:bg-[#1f1f1f] transition h-full">
                            <div className="w-14 h-14 bg-[#2a2a2a] flex items-center justify-center rounded-full mb-4">
                                <Image src={service.icon} alt={service.title} width={28} height={28} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                                <p className="text-sm text-gray-300 leading-relaxed">{service.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Properties Section */}
            <section className="bg-[#0f0f0f] text-white py-16 px-6 sm:px-10 lg:px-24">
                <h2 className="text-4xl font-semibold text-center mb-12">Featured Properties</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {related.map((property) => (
                        <Link
                            key={property.id}
                            href={`/listings/${property.id}`}
                            className="bg-[#141414] border border-[#262626] rounded-xl hover:scale-[1.01] transition overflow-hidden"
                        >
                            <div className="relative w-full h-48">
                                <Image
                                    src={property.images[0] || "/fallback.jpg"}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{property.title}</h3>
                                <p className="text-sm text-gray-400 line-clamp-2 mb-3">{property.description}</p>
                                <div className="flex gap-2 text-xs mb-4">
                                    <span className="bg-[#1a1a1a] px-2 py-1 rounded border border-[#262626]">{property.bedrooms || 0} Beds</span>
                                    <span className="bg-[#1a1a1a] px-2 py-1 rounded border border-[#262626]">{property.bathrooms || 0} Baths</span>
                                    <span className="bg-[#1a1a1a] px-2 py-1 rounded border border-[#262626]">{property.type}</span>
                                </div>
                                <p className="font-bold text-xl">AED {property.price.toLocaleString()}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center mt-8">
                    <Link href="/listings">
                        <button className="px-6 py-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white">View All Listings</button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
