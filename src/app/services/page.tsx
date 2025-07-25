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

                const mappedListings = (data.data.list || []).map((item: any) => ({
                    id: item.propertyId,
                    title: item.title,
                    description: item.description,
                    location: item.region,
                    bedrooms: item?.bedroomMax || 0,
                    bathrooms: item?.rentParam?.bathrooms || 0,
                    type: item?.propertyType?.[0] || "N/A",
                    price: item.price,
                    images: item.photos?.map((img: string) =>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {[
                        { icon: "/services/home.png", title: "Homes for Sale", desc: "Browse our listings—From cozy cottages to luxury villas." },
                        { icon: "/services/Build.png", title: "Property Management", desc: "We manage tenants, maintenance, and rentals for you." },
                        { icon: "/services/hand.png", title: "Mortgage Services", desc: "Tailored mortgage plans to finance your dream home." },
                        { icon: "/services/money.png", title: "Home Valuation", desc: "Get expert home value insights free of charge." },
                    ].map((service, idx) => (
                        <div key={idx} className="flex items-start gap-5 bg-[#121212] p-6 rounded-xl border border-[#262626] hover:bg-[#1f1f1f] transition">
                            <div className="w-14 h-14 bg-[#2a2a2a] flex items-center justify-center rounded-full">
                                <Image src={service.icon} alt={service.title} width={28} height={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
                                <p className="text-sm text-gray-300">{service.desc}</p>
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
                        <Link key={property.id} href={`/listings/${property.id}`} className="bg-[#141414] border border-[#262626] rounded-xl hover:scale-[1.01] transition overflow-hidden">
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
