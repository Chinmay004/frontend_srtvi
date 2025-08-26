

//version @ dropping this cause shifting back to backend
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/component/layout/Navbar";
import Footer from "@/component/layout/Footer";
import Link from "next/link";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import Image from "next/image";
import ContactModal from "@/component/ContactModal"
import { fetchNearbyAmenities, Amenity } from "@/utils/fetchNearbyAmenities";
import { decodeAmenities } from "@/utils/decodeAmenities";
import { geocodeRegion } from "@/utils/geocodeRegion";

// Fix Leaflet icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


const IMAGE_BASE_URL = "https://oss.pixxicrm.com";
const MapClientOnly = dynamic(() => import("@/component/MapClientOnly"), { ssr: false });

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
  amenities?: string[];
  area?: string;
  floors?: number;
  developerName?: string;
  latitude?: number;
  longitude?: number;
}

interface RelatedListingItem {
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
  photos: string[];
}


export default function ListingDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const [nearbyAmenities, setNearbyAmenities] = useState<Amenity[]>([]);
  const [listing, setListing] = useState<Listing | null>(null);
  const [related, setRelated] = useState<Listing[]>([]);
  const [page, setPage] = useState(1);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [wasGeocoded, setWasGeocoded] = useState(false);


  // Fetch listing details
  useEffect(() => {
    if (!id) return;

    const fetchListingDetail = async () => {
      try {
        const res = await fetch(`https://dataapi.pixxicrm.ae/pixxiapi/v1/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-PIXXI-TOKEN": "GwoU8j7WFPwaAUfCz7B6NAHFwMBaSLak",
          },
        });

        const data = await res.json();
        const item = data.data;

        const mappedListing: Listing = {
          id: item.propertyId,
          title: item.name,
          description: decodeHtmlEntities(item.description),
          location: item.regionName || item.cityName || "Dubai",
          bedrooms: item?.newParameter?.bedroomMax ? parseInt(item.newParameter.bedroomMax) : 0,
          bathrooms: item?.newParameter?.washRoom || 0,
          type: item.houseType?.[0] || "N/A",
          price: item.price,
          images: item.photos?.map((img: string) =>
            img.startsWith("http") ? img : `${IMAGE_BASE_URL}${img}`
          ) || [],
          amenities: item.newParameter?.amenities
            ? decodeAmenities(item.newParameter.amenities)
            : [],
          area: item.newParameter?.maxSize
            ? `${item.newParameter.maxSize} sq.ft`
            : undefined,
          floors: item.newParameter?.totalFloor
            ? parseInt(item.newParameter.totalFloor)
            : undefined,
          developerName: item.developerName,
          //   latitude: item.newParameter?.position
          //     ? parseFloat(item.newParameter.position.split(",")[0])
          //     : 0,
          //   longitude: item.newParameter?.position
          //     ? parseFloat(item.newParameter.position.split(",")[1])
          //     : 0,

          latitude: item.newParameter?.position
            ? parseFloat(item.newParameter.position.split(",")[0])
            : undefined,
          longitude: item.newParameter?.position
            ? parseFloat(item.newParameter.position.split(",")[1])
            : undefined,
        };



        setListing(mappedListing);

        let lat = mappedListing.latitude;
        let lng = mappedListing.longitude;

        if ((!lat || !lng) && mappedListing.location) {
          const geo = await geocodeRegion(mappedListing.location);
          if (geo) {
            lat = geo.lat;
            lng = geo.lon;
            setWasGeocoded(true);
          }
        }

        // Pass these coordinates to map and amenity fetch
        if (lat && lng) {
          fetchNearbyAmenities(lat, lng).then(setNearbyAmenities);
          setListing(prev => prev ? { ...prev, latitude: lat, longitude: lng } : prev);
        }


        // After setListing(...)
        if (mappedListing.latitude && mappedListing.longitude) {
          const lat = mappedListing.latitude;
          const lng = mappedListing.longitude;

          fetchNearbyAmenities(lat, lng).then(setNearbyAmenities);
        }
        setMainImage(mappedListing.images[0] || "/fallback.jpg");
      } catch (error) {
        console.error("Error fetching listing detail:", error);
      }
    };

    fetchListingDetail();
  }, [id]);

  // Fetch related listings
  useEffect(() => {
    const fetchRelatedListings = async () => {
      try {
        const res = await fetch("https://dataapi.pixxicrm.ae/pixxiapi/v1/properties/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-PIXXI-TOKEN": "GwoU8j7WFPwaAUfCz7B6NAHFwMBaSLak",
          },
          body: JSON.stringify({ page, size: 3 }),
        });

        const data = await res.json();

        const mappedRelated = data.data.list.map((item: RelatedListingItem) => ({
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


        setRelated(mappedRelated);
      } catch (error) {
        console.error("Error fetching related listings:", error);
      }
    };

    fetchRelatedListings();
  }, [page]);

  if (!listing) return <div className="text-white">Loading...</div>;

  function toTitleCase(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  function decodeHtmlEntities(str: string): string {
    return str
      .replace(/â€¢/g, "•")
      .replace(/â€™/g, "’")
      .replace(/â€“/g, "–")
      .replace(/â€œ/g, "“")
      .replace(/â€/g, "…")
      .replace(/â€/g, "”")
      .replace(/Ã©/g, "é")
      .replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/â€/g, "-")
      .replace(/Ã/g, "à");
  }


  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <section className="mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8 mx-8">
          {/* Image Section */}
          <div className="w-full lg:w-3/5">
            <div className="relative w-full h-96 rounded-xl overflow-hidden">
              <Image
                src={mainImage || "/fallback.jpg"}
                alt={listing.title}
                fill
                className="object-cover"
              />
            </div>

            {/* <div className="flex gap-2 mt-4 overflow-x-auto">
              {listing.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`relative w-28 h-20 rounded-lg overflow-hidden border ${
                    mainImage === img ? "border-white" : "border-transparent"
                  } focus:outline-none`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div> */}

            {/* version2 */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 mt-4 max-h-[110px] overflow-y-auto pr-2">
                {listing.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(img)}
                    className={`relative aspect-[4/3] w-full rounded-lg overflow-hidden border ${
                      mainImage === img ? "border-white" : "border-transparent"
                    } focus:outline-none`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div> */}




            <div className="flex overflow-x-auto gap-2 mt-4 pb-2 scrollbar-hide">
              {listing.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`relative flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden border ${mainImage === img ? "border-white" : "border-transparent"
                    }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>



          </div>

          {/* Details Section */}
          <div className="w-full lg:w-2/5">
            <h1 className="text-3xl font-bold mb-2 capitalize">{listing.title}</h1>
            <p className="mb-2 capitalize text-[#479aff]">{listing.location}</p>
            {/* <div className="text-[#999999] mb-4 max-h-52 overflow-y-auto pr-2">
              <p className="whitespace-pre-line">
                {listing.description}
              </p>
            </div> */}

            <div><p className="text-[#999999] mb-4 max-h-52 overflow-y-auto scrollbar-hide">
              {listing.description.length > 400
                ? `${listing.description}`
                : listing.description}
            </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm mb-4">
              <span className="bg-[#1a1a1a] px-2 py-1 rounded-xl border border-[#262626] flex items-center gap-1">
                <Image src="/building/Icon.png" alt="" className="h-4" width={16} height={16} />
                {listing.bedrooms > 0 ? `${listing.bedrooms}-Bedroom` : 'Bedroom'}
              </span>
              <span className="bg-[#1a1a1a] px-2 py-1 rounded-xl border border-[#262626] flex items-center gap-1">
                <Image src="/building/Icon1.png" alt="" className="h-4" width={16} height={16} />
                {listing.bathrooms > 0 ? `${listing.bathrooms}-Bathroom` : 'Bathroom'}
              </span>
              <span className="bg-[#1a1a1a] px-2 py-1 rounded-xl border border-[#262626] flex items-center gap-1">
                <Image src="/building/Icon2.png" alt="" className="h-4" width={16} height={16} />
                {listing.type}
              </span>
            </div>

            <p className="text-4xl font-semibold mb-4 mt-10">
              AED {listing.price.toLocaleString()}
            </p>

            <button
              onClick={() => setShowContactModal(true)}
              className="bg-white w-3/4 mt-4 font-bold text-black px-6 py-3 rounded hover:bg-yellow-600"
            >
              Enquire Now
            </button>

          </div>
        </div>
      </section>

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />



      {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 text-sm mt-10 bg-[#1a1a1a] py-10 px-13">
        <p className="flex flex-col text-lg">
          <strong className="text-[#a5a5a5] font-normal">Developer Name</strong> {listing.developerName || "Sartawi Developers"}
        </p>
        <p className="flex flex-col text-lg">
          <strong className="text-[#a5a5a5] font-normal">Area</strong> {listing.area || "1220 sq.ft"}
        </p>
        <p className="flex flex-col text-lg">
          <strong className="text-[#a5a5a5] font-normal">Amenities</strong> 
          {listing.amenities?.join(", ") || "Children’s Play Area, Swimming Pool"}
        </p>
       <p className="flex flex-col text-lg">
          <strong className="text-[#a5a5a5] font-normal">Region</strong> {listing.location}
        </p>
        <p className="flex flex-col text-lg">
          <strong className="text-[#a5a5a5] font-normal">Bedrooms</strong> {listing.bedrooms || 2+"plus"} 
        </p>
        <p className="flex flex-col text-lg">
          <strong className="text-[#a5a5a5] font-normal">Floors</strong> {listing.floors || 2}
        </p>
        <p className="flex flex-col text-lg">
          <strong className="text-[#a5a5a5] font-normal">Security</strong> Yes
        </p>
        <p className="flex flex-col text-lg">
          <strong className="text-[#a5a5a5] font-normal">Type</strong> {listing.type}
        </p>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm mt-10 bg-[#1a1a1a] py-10 px-4 sm:px-8 lg:px-12 min-h-54">
        {listing.developerName && (
          <p className="flex flex-col text-base">
            <strong className="text-[#a5a5a5] font-normal">Developer Name</strong>
            {listing.developerName}
          </p>
        )}

        {listing.area && (
          <p className="flex flex-col text-base">
            <strong className="text-[#a5a5a5] font-normal">Area</strong>
            {listing.area}
          </p>
        )}

        {listing.amenities && listing.amenities.length > 0 && (
          <p className="flex flex-col text-base">
            <strong className="text-[#a5a5a5] font-normal">Amenities</strong>
            {listing.amenities.join(", ")}
          </p>
        )}

        {listing.location && (
          <p className="flex flex-col text-base">
            <strong className="text-[#a5a5a5] font-normal">Region</strong>
            {listing.location}
          </p>
        )}

        {typeof listing.bedrooms === "number" && listing.bedrooms > 0 && (
          <p className="flex flex-col text-base">
            <strong className="text-[#a5a5a5] font-normal">Bedrooms</strong>
            {listing.bedrooms}
          </p>
        )}

        {typeof listing.floors === "number" && (
          <p className="flex flex-col text-base">
            <strong className="text-[#a5a5a5] font-normal">Floors</strong>
            {listing.floors}
          </p>
        )}

        <p className="flex flex-col text-base">
          <strong className="text-[#a5a5a5] font-normal">Security</strong>
          Yes
        </p>

        {listing.type && (
          <p className="flex flex-col text-base">
            <strong className="text-[#a5a5a5] font-normal">Type</strong>
            {listing.type}
          </p>
        )}
      </div>



      <div className="bg-black py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              About the Neighbourhood
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover what makes this location special and explore the surrounding amenities
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map Section */}
            <div className="lg:col-span-2">
              <div className="bg-[#0f0f0f] rounded-2xl shadow-2xl overflow-hidden border border-[#1a1a1a]">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white capitalize mb-2">
                        {listing.title}
                      </h3>
                      <p className="text-gray-300 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#479aff]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {listing.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Coordinates</p>
                      <p className="text-xs text-gray-500 font-mono">
                        {listing.latitude?.toFixed(6)}, {listing.longitude?.toFixed(6)}
                      </p>
                    </div>
                  </div>

                  {typeof listing.latitude === "number" &&
                    typeof listing.longitude === "number" ? (
                    <div className="relative">
                      <MapClientOnly
                        lat={listing.latitude}
                        lng={listing.longitude}
                        title={listing.title}
                        location={listing.location}
                        height={wasGeocoded ? "400px" : "350px"}
                        developerName={listing.developerName}
                      />
                      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-[#333]">
                        <p className="text-xs text-gray-300 font-medium">Interactive Map</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#1a1a1a] rounded-xl h-64 flex items-center justify-center border border-[#333]">
                      <div className="text-center">
                        <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-gray-400 font-medium">Location not available</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <button
                      onClick={() => {
                        const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${listing.latitude},${listing.longitude}`;
                        if (typeof window !== 'undefined') {
                          window.open(gmapsUrl, "_blank");
                        }
                      }}
                      className="w-full bg-gradient-to-r from-[#479aff] to-[#157cfb] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#157cfb] hover:to-[#479aff] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                      </svg>
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="lg:col-span-1">
              <div className="bg-[#0f0f0f] rounded-2xl shadow-2xl border border-[#1a1a1a] h-full">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#479aff] to-[#157cfb] rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Nearby Amenities</h3>
                      <p className="text-sm text-gray-400">Discover what&apos;s around</p>
                    </div>
                  </div>

                  {nearbyAmenities.length === 0 ? (
                    <div className="text-center py-8">
                      <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.263M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-gray-400 font-medium">No amenities found nearby</p>
                      <p className="text-sm text-gray-500 mt-1">Try expanding your search area</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {nearbyAmenities.slice(0, 6).map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1a1a1a] transition-colors duration-200 border border-transparent hover:border-[#333]">
                          <div className="w-8 h-8 bg-[#1a1a1a] rounded-lg flex items-center justify-center flex-shrink-0 border border-[#333]">
                            <svg className="w-4 h-4 text-[#479aff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white truncate">{item.name}</p>
                            <p className="text-sm text-gray-400">
                              {(item.distance / 1000).toFixed(1)} km away
                            </p>
                          </div>
                        </div>
                      ))}
                      {nearbyAmenities.length > 6 && (
                        <div className="text-center pt-2">
                          <p className="text-sm text-[#479aff] font-medium">
                            +{nearbyAmenities.length - 6} more amenities
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <section className="bg-[#0f0f0f] text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl  mb-6 text-center py-6">Other Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {related.map((property) => (
              <Link
                key={property.id}
                href={`/listings/${property.id}`}
                className="bg-[#141414] p-3 border border-[#262626] rounded-xl block"
              >
                <div className="bg-[#141414] rounded-lg overflow-hidden">
                  <Image
                    src={property.images[0] || "/fallback.jpg"}
                    alt={property.title}
                    className="w-full h-48 object-cover rounded-xl"
                    width={500}
                    height={200}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1 capitalize line-clamp-2 min-h-[3rem]"> {toTitleCase(property.title)}</h3>
                    <p className="text-sm text-gray-400 mb-2 line-clamp-2 min-h-[3rem]" >
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
                      AED {property.price.toLocaleString()}
                    </p>
                    <button className="w-full py-2 bg-[#363636] hover:bg-[#464646] rounded text-sm">
                      View Property Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-end mt-6 gap-3">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600"
            >
              ←
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600"
            >
              →
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
