'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Navbar from "@/component/layout/Navbar";
import Footer from "@/component/layout/Footer";
import Link from "next/link";
import Image from "next/image";

interface Listing {
  id: string;
  propertyId: number;
  title: string;
  description: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  type: string;
  price: number;
  images: string[];
  developer: string;
}


interface APIListing {
  propertyId: number;
  title: string;
  description: string;
  region?: string;
  developer?: string;
  bedrooms?: number;
  propertyType?: string[];
  price: number;
  images: string[];
}

export default function ClientVillas() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || "";
  const [search, setSearch] = useState(initialSearch);
  const [listings, setListings] = useState<Listing[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const listingsPerPage = 12;
  const [marketType, setMarketType] = useState<'offPlan' | 'secondary'>('offPlan');


  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/listings/pixxi`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page,
            limit: listingsPerPage,
            search,
            marketType
          }),
        });

        const data = await res.json();

        const mappedListings: Listing[] = data.records.map((item: APIListing) => ({
          id: String(item.propertyId),
          propertyId: item.propertyId,
          title: item.title,
          description: item.description,
          location: item.region || "N/A",
          developer: item.developer || "N/A",
          bedrooms: item.bedrooms ?? 0,
          bathrooms: 0,
          type: item.propertyType?.[0] || "N/A",
          price: item.price,
          images: item.images,
        }));

        setListings(mappedListings);
        setTotalCount(data.totalCount || 0);
      } catch (error) {
        console.error("Error loading listings:", error);
      }
    };

    fetchListings();
  }, [page, search,marketType]);

  const totalPages = Math.ceil(totalCount / listingsPerPage);

  function toTitleCase(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative w-full h-[30vh] overflow-hidden">
        <Image
          src="/sunset.jpg"
          alt="Hero Image"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70 z-10 flex flex-col justify-center items-center text-center px-4">
         <h1 className="text-4xl sm:text-5xl font-bold mb-2">
            Properties in{" "}
            <span className="text-[#e0b973]">
              {search ? toTitleCase(search) : "Dubai"}
            </span>
          </h1>
          <p className="max-w-xl text-gray-300 text-sm">
            Find the best properties in one place.
          </p>
        </div>
      </div>

    {/* <div className='flex justify-between items-center max-w-7xl mx-auto px-4 py-8 flex-wrap gap-4  '>
        
      <div className=" border flex justify-between items-center max-w-7xl mx-auto px-4 py-15">
            <div className="flex items-center gap-2 border border-gray-600 rounded px-3 py-2 w-full max-w-md bg-[#161616]">
              <FiSearch />
              <input
                type="text"
                placeholder="Search for a Property by Name"
                className="focus:outline-none w-full text-[#bebebe] bg-[#161616]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div> */}
        {/* <button className="bg-white text-black px-4 py-2 rounded ml-4 font-bold flex justify-center items-center gap-2">
          Filter <CiFilter size={24} className="stroke-[1]" />
        </button> */}
        {/* <div className="mt-8 flex items-center bg-gradient-to-r from-zinc-700 to-zinc-800 rounded-full p-1">
       
          <button
            className={`${marketType === "secondary" ? "bg-white text-black font-bold" : "text-white font-light"} px-6 py-2 rounded-full shadow-sm transition-all`}
            onClick={() => setMarketType("secondary")}
          >
            Secondary Market
          </button>
             <button
            className={`${marketType === "offPlan" ? "bg-white text-black font-bold" : "text-white font-light"} px-6 py-2 rounded-full shadow-sm transition-all`}
            onClick={() => setMarketType("offPlan")}
          >
            Off-Plan
          </button>
        </div>
      </div>

      </div> */}

      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-8 flex-wrap gap-4">
  {/* Search Bar */}
  <div className="flex items-center gap-2 border border-gray-600 rounded px-3 py-2 w-full max-w-md bg-[#161616]">
    <FiSearch />
    <input
      type="text"
      placeholder="Search for a Property by Name"
      className="focus:outline-none w-full text-[#bebebe] bg-[#161616]"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  {/* Toggle Buttons */}
  <div className="flex items-center bg-gradient-to-r from-zinc-700 to-zinc-800 rounded-full p-1">
      <button
      className={`${marketType === "offPlan" ? "bg-white text-black font-bold" : "text-white font-light"} px-6 py-2 rounded-full shadow-sm transition-all`}
      onClick={() => setMarketType("offPlan")}
    >
      Off-Plan
    </button>
     <button
      className={`${marketType === "secondary" ? "bg-white text-black font-bold" : "text-white font-light"} px-6 py-2 rounded-full shadow-sm transition-all`}
      onClick={() => setMarketType("secondary")}
    >
      Secondary Market
    </button>
  
  </div>
</div>


    
      {/* toggle button */}
  


      {/* Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto pb-16">
        {listings.map((property) => (
          <Link
            key={property.id}
            href={`/listings/${property.id}`}
            className="bg-[#141414] p-3 border border-[#262626] rounded-xl block"
          >
            <div className="bg-[#141414] rounded-lg overflow-hidden">
              <div className="w-full h-[192px] relative rounded-xl overflow-hidden">
                <Image
                  src={property.images?.[0] || "/fallback.jpg"}
                  alt={property.title || "Property image"}
                  fill
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== window.location.origin + "/fallback.jpg") {
                      target.src = "/fallback.jpg";
                    }
                  }}
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 capitalize line-clamp-2 min-h-[3rem]">
                  {toTitleCase(property.title)}
                </h3>
                <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                  {property.description.slice(0, 80)}...
                  <span className="text-white underline cursor-pointer">Read More</span>
                </p>
                <div className="flex flex-wrap gap-2 text-xs mb-3">
                  <span className="bg-[#1a1a1a] px-2 py-1 rounded-xl border border-[#262626] flex items-center gap-1">
                    <Image src="/building/Icon.png" alt="" className="h-4" width={16} height={16} />
                    {property.bedrooms > 0 ? `${property.bedrooms}-Bedroom` : 'Bedroom'}
                  </span>
                  <span className="bg-[#1a1a1a] px-2 py-1 rounded-xl border border-[#262626] flex items-center gap-1">
                    <Image src="/building/Icon1.png" alt="" className="h-4" width={16} height={16} />
                    {property.bathrooms > 0 ? `${property.bathrooms}-Bathroom` : 'Bathroom'}
                  </span>
                  <span className="bg-[#1a1a1a] px-2 py-1 rounded-xl border border-[#262626] flex items-center gap-1">
                    <Image src="/building/Icon2.png" alt="" className="h-4" width={16} height={16} />
                    {property.type}
                  </span>
                </div>
                <p className="font-bold mb-3 text-xl pt-3">
                  AED {typeof property.price === "number" ? property.price.toLocaleString() : "N/A"}
                </p>
                <button className="w-full py-2 bg-[#363636] hover:bg-[#464646] rounded text-sm">
                  View Property Details
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-3 pb-16">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
