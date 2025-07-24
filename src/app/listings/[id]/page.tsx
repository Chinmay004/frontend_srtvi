

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



      <div className="bg-[#fafafa] py-16 px-4 sm:px-6 lg:px-12">
        <h2 className="text-center text-3xl font-semibold mb-10 text-black">
          About the Neighbourhood
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Latitude: {listing.latitude}, Longitude: {listing.longitude}
        </p>


        {/* <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-xl overflow-hidden"> */}
        <div className={`flex flex-col ${wasGeocoded ? "items-center" : "lg:flex-row"} bg-white shadow-lg rounded-xl overflow-hidden`}>

          {/* Left Column - Map Section */}
          {/* <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between"> */}
          <div className={`${wasGeocoded ? "w-full lg:w-2/3" : "w-full lg:w-1/2"} p-6 sm:p-8 flex flex-col justify-between`}>
            <div>
              <h3 className="text-xl text-black font-semibold mb-2 capitalize">
                {listing.title}
              </h3>
              <p className="text-gray-600 mb-4">{listing.location}</p>

              {typeof listing.latitude === "number" &&
                typeof listing.longitude === "number" ? (
                // <div className={`${wasGeocoded ? "h-[500px]" : "h-[300px]"} mb-4`}>

                <MapClientOnly
                  lat={listing.latitude}
                  lng={listing.longitude}
                  title={listing.title}
                  location={listing.location}
                  height={wasGeocoded ? "500px" : "300px"}

                />
                // </div>

              ) : (
                <p className="text-sm text-gray-500">Location not available</p>
              )}
            </div>

            <button
              onClick={() => {
                const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${listing.latitude},${listing.longitude}`;
                window.open(gmapsUrl, "_blank");
              }}
              className="bg-[#157cfb] text-white px-6 py-2 rounded mt-6 font-sans w-full"
            >
              Get Directions
            </button>
          </div>

          {/* Divider - visible only on large screens */}
          <div className="hidden lg:block w-px bg-gray-300 mx-2"></div>

          {/* Right Column - Amenities */}
          {/* <div className="w-full lg:w-1/2 p-6 sm:p-8 bg-white">
          <h3 className="text-xl font-semibold mb-4 text-black">
            Amenities Near You
          </h3>
          <ul className="space-y-3 text-[#565656]">
          {nearbyAmenities.length === 0 ? (
            <li>No amenities found nearby.</li>
          ) : (
            nearbyAmenities.map((item, index) => (
              <li key={index}>
                <strong className="text-lg">{item.name}</strong>
                <br />
                {(item.distance / 1000).toFixed(1)} km from location
              </li>
            ))
          )}
        </ul>
        </div> */}

          {!wasGeocoded && (

            <div className="w-full lg:w-1/2 p-6 sm:p-8 bg-white">
              <h3 className="text-xl font-semibold mb-4 text-black">
                Amenities Near You
              </h3>
              <ul className="space-y-3 text-[#565656]">
                {nearbyAmenities.length === 0 ? (
                  <li>No amenities found nearby.</li>
                ) : (
                  nearbyAmenities.map((item, index) => (
                    <li key={index}>
                      <strong className="text-lg">{item.name}</strong>
                      <br />
                      {(item.distance / 1000).toFixed(1)} km from location
                    </li>
                  ))
                )}
              </ul>
            </div>



          )}

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
