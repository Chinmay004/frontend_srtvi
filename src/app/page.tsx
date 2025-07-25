'use client';

import Navbar from "@/component/layout/Navbar";
import Footer from "@/component/layout/Footer";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const IMAGE_BASE_URL = "https://oss.pixxicrm.com";

// const logos = [
//   { src: "devv/Ellingto.png", name: "Ellington" },
//   { src: "devv/Deyaar.png", name: "Deyaar" },
//   { src: "devv/Omniyat.png", name: "Omniyat" },
//   { src: "devv/Arada.png", name: "Arada" },
//   { src: "devv/Damac.png", name: "Damac" },
//   { src: "devv/BInghatti.png", name: "Binghatti" },
//   { src: "devv/Meraas.png", name: "Meraas" },
//   { src: "devv/Nakheel.png", name: "Nakheel" },
//   { src: "devv/Azizi.png", name: "Azizi" },
// ];

const logos = [
  { src: "/devv/Ellingto.webp", name: "Ellington" },
  { src: "/devv/Deyaar.webp", name: "Deyaar" },
  { src: "/devv/Omniyat.webp", name: "Omniyat" },
  { src: "/devv/Arada.webp", name: "Arada" },
  { src: "/devv/Damac.webp", name: "Damac" },
  { src: "/devv/BInghatti.webp", name: "Binghatti" },
  { src: "/devv/Meraas.webp", name: "Meraas" },
  { src: "/devv/Nakheel.webp", name: "Nakheel" },
  { src: "/devv/Azizi.webp", name: "Azizi" },
];

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
}

interface RawAPIListing {
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



export default function Home() {
  const router = useRouter();
  const [inputSearch, setInputSearch] = useState("");
  const [related, setRelated] = useState<Listing[]>([]);
  const [selectedOption, setSelectedOption] = useState<"Buy" | "Rent">("Buy");


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

        const mappedListings = (data.data.list as RawAPIListing[]).map((item) => ({
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
    <div>
      <div className="relative h-[95vh] w-full overflow-hidden text-white">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 flex flex-col h-full">
          <Navbar />
          <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight">
              Discover Your Dream Property <br /> with{" "}
              <span className="font-semibold ">Sartawi</span>
            </h1>
            <div className="mt-8 flex items-center bg-gradient-to-r from-zinc-700 to-zinc-800 rounded-full p-1">
              <button
                className={`${selectedOption === "Buy" ? "bg-white text-black font-bold" : "text-white font-light"} px-6 py-2 rounded-full shadow-sm transition-all`}
                onClick={() => setSelectedOption("Buy")}
              >
                Buy
              </button>
              <button
                className={`${selectedOption === "Rent" ? "bg-white text-black font-bold" : "text-white font-light"} px-6 py-2 rounded-full shadow-sm transition-all`}
                onClick={() => setSelectedOption("Rent")}
              >
                Rent
              </button>
            </div>

            <div className="mt-6 w-full max-w-xl">
              <div className="flex bg-[#696969] backdrop-blur-sm rounded-full overflow-hidden">
                <input
                  type="text"
                  placeholder="Search for Properties, Location etc..."
                  className="flex-grow px-4 bg-transparent text-white placeholder-white focus:outline-none font-semibold"
                  value={inputSearch}
                  onChange={(e) => setInputSearch(e.target.value)}
                />
                <button
                  className="bg-black m-2 py-1 px-8 text-white rounded-full hover:bg-white hover:text-black transition font-semibold"
                  onClick={() => {
                    if (inputSearch.trim()) {
                      router.push(`/listings?search=${encodeURIComponent(inputSearch.trim())}`);
                    }
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="h-52 bg-[#0f0f0f] overflow-hidden relative">
            <div className="absolute top-1/2 -translate-y-1/2 w-full">
              <div className="flex w-max animate-marquee gap-16">
                {[...logos, ...logos].map((src, idx) => (
                <div key={`${src}-${idx}`} className="relative h-72 w-72">
                  <Image
                    src={src}
                    alt={`Logo ${idx}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
              </div>
            </div>
          </div> */}

      <div className="h-52 bg-gradient-to-r from-black via-black to-[#222222] overflow-hidden relative">
        <div className="absolute top-1/2 -translate-y-1/2 w-full">
          <div className="flex w-max animate-marquee gap-16">
            {[...logos, ...logos].map((item, idx) => (
              <div
                key={`${item.src}-${idx}`}
                className="relative h-72 w-72 cursor-pointer"
                onClick={() => {
                  router.push(`/listings?search=${encodeURIComponent(item.name)}`);
                }}
              >
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* new */}
      <section className="bg-black text-white px-6 py-24 sm:px-10 lg:px-24 relative overflow-hidden">
        {/* Soft grey blur accents */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-gray-700 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[10%] right-[5%] w-72 h-72 bg-gray-600 opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto space-y-32 z-10">

          {/* Who Are We */}
          <div className="flex flex-col lg:flex-row items-center gap-12 group" data-aos="fade-up">
            {/* Text first */}
            {/* <div className="w-full lg:w-[55%] order-1 lg:order-none">
              <h2 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase mb-6 tracking-widest">
                Who Are We
              </h2>
              <p className="text-lg leading-relaxed text-gray-300">
                <span className="italic text-white font-medium block mb-4">
                  “From a Village of Hope to a City of Dreams”
                </span>
                Sartawi Properties was born from the dreams of two brothers from a small village in Palestine&mdash;a name that stands for <strong className="text-white">TRUST, RESILIENCE and AMBITION</strong>.
                <br /><br />
                With over two decades of combined experience, they have witnessed the city&rsquo;s transformation firsthand and developed a unique understanding of its market dynamics.
                <br /><br />
                They transformed their local expertise into a global real estate company, helping international investors navigate the city&rsquo;s dynamic and booming property market.
              </p>
            </div> */}
            {/* Who Are We */}
            <div className="flex flex-col lg:flex-row items-center gap-12 group" data-aos="fade-up">
              {/* Text first */}
              <div className="w-full lg:w-[55%] order-1 lg:order-none">
                <h2 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase mb-6 tracking-widest">
                  Who Are We
                </h2>
                <p className="text-lg leading-relaxed text-gray-300">
                  <span className="italic text-white font-medium block mb-4">
                    “From a Village of Hope to a City of Dreams”
                  </span>
                  Sartawi Properties was born from the dreams of two brothers from a small village in Palestine&mdash;a name that stands for <strong className="text-white">TRUST, RESILIENCE and AMBITION</strong>.
                  <br /><br />
                  With over two decades of combined experience, they have witnessed the city&rsquo;s transformation firsthand and developed a unique understanding of its market dynamics.
                  <br /><br />
                  They transformed their local expertise into a global real estate company, helping international investors navigate the city&rsquo;s dynamic and booming property market.
                </p>
              </div>

              {/* Image second (portrait ratio) */}
              {/* <div className="w-full lg:w-[45%] order-2 lg:order-none transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-gray-800">
                  <Image
                    src="/2menp.jpg"
                    alt="Founders of Sartawi Properties"
                    fill
                    className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
              </div>*/}
              <div className="flex justify-center w-full lg:w-[45%] order-2 lg:order-none transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="relative aspect-[3/4] w-64 sm:w-72 md:w-80 lg:w-72 xl:w-80 rounded-2xl overflow-hidden shadow-lg border border-gray-800 bg-black">
                  <Image
                    src="/2men.jpg"
                    alt="Founders of Sartawi Properties"
                    fill
                    className="object-contain rounded-2xl transition-transform duration-500 ease-out"
                  />
                </div>
              </div>

            </div>



            {/* Image second */}
            {/* <div className="w-full lg:w-[45%] order-2 lg:order-none transition-transform duration-300 group-hover:scale-[1.02]">
              <div className="relative w-full h-0 pb-[75%] rounded-2xl overflow-hidden shadow-lg border border-gray-800">
                <Image
                  src="/2men.jpg"
                  alt="Founders of Sartawi Properties"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            </div> */}
          </div>

          {/* Our Purpose */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 group" data-aos="fade-up">
            {/* Text first */}
            <div className="w-full lg:w-[55%] order-1 lg:order-none">
              <h2 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white uppercase mb-6 tracking-widest">
                Our Purpose
              </h2>
              <p className="text-lg leading-relaxed text-gray-300">
                At Sartawi Properties, our purpose goes beyond transactions&mdash;we help shape futures. As trusted real estate brokers, we guide international investors through Dubai&rsquo;s dynamic property market with transparency, tailored support, and reliable results.
                <br /><br />
                Our mission is to build lasting relationships by offering personalized solutions that meet each client&rsquo;s unique goals.
                <br /><br />
                With a profound understanding of the local market and a global perspective, we are well-equipped to navigate the complexities of Dubai&rsquo;s real estate landscape and deliver outstanding results.
                <br /><br />
                We aim to create a global community of investors built on integrity, expertise, and long-term value while our experts navigate the complexities of Dubai&rsquo;s real estate landscape and deliver outstanding results.
              </p>
            </div>

            {/* Image second */}
            <div className="w-full lg:w-[45%] order-2 lg:order-none transition-transform duration-300 group-hover:scale-[1.02]">
              <div className="relative w-full h-0 pb-[75%] rounded-2xl overflow-hidden shadow-lg border border-gray-800">
                <Image
                  src="/group.jpg"
                  alt="Our Purpose"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            </div>
          </div>

        </div>
      </section>



      <div className="bg-black text-white">
        {/* <div className="bg-gradient-to-r from-[#2c2c3c] via-black to-black text-white py-16 px-4 sm:px-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {[
              { icon: "/services/home.png", title: "Homes for Sale", desc: "Browse our extensive listings of homes for sale. From cozy cottages to luxurious mansions, we have it all." },
              { icon: "/services/Build.png", title: "Property Management", desc: "Need help with your rental? Our team handles everything—tenants, maintenance, and more." },
              { icon: "/services/hand.png", title: "Mortgage Services", desc: "We offer tailored mortgage solutions to help finance your dream home." },
              { icon: "/services/money.png", title: "Home Valuation", desc: "Wondering what your home is worth? Get a free valuation from our expert team today." },
            ].map((service, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="bg-[#2a2a2a] p-6 rounded-lg">
                  <Image src={service.icon} alt="" className="w-8" width={32} height={32} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="text-sm text-gray-300">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}




        <section className="bg-gradient-to-r from-black via-[#222222] to-black text-white py-12 text-center w-full">
          <h2 className="text-3xl font-bold mb-8">What have we Achieved</h2>
          <div className="flex flex-wrap justify-around gap-12 px-10">
            <div>
              <p className="text-sm">Total Properties</p>
              <p className="text-3xl font-bold">1000+</p>
            </div>
            <div>
              <p className="text-sm">Properties Sold</p>
              <p className="text-3xl font-bold">100+</p>
            </div>
            <div>
              <p className="text-sm">Total Clients</p>
              <p className="text-3xl font-bold">60+</p>
            </div>
            <div>
              <p className="text-sm">Total Locations</p>
              <p className="text-3xl font-bold">25+</p>
            </div>
          </div>
        </section>


        {/* Our Real Estate Agents */}

        {/* Featured Properties */}
        <section className="bg-[#0f0f0f] text-white py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-normal mb-6 text-center">Featured Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((property) => (
                <Link
                  key={property.id}
                  href={`/listings/${property.id}`}
                  className="bg-[#141414] p-3 border border-[#262626] rounded-xl block"
                >
                  <div className="bg-[#141414] rounded-lg overflow-hidden">
                    <div className="relative w-full h-48 rounded-xl overflow-hidden">
                      <Image
                        src={property.images[0] || "/fallback.jpg"}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-1 line-clamp-2 min-h-[3rem]">
                        {property.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">
                        {property.description.slice(0, 80)}...
                        <span className="text-white underline cursor-pointer">Read More</span>
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs mb-3">
                        <span className="bg-[#1a1a1a] px-2 py-1 rounded-xl border border-[#262626] flex items-center gap-1">
                          <Image src="/building/Icon.png" alt="" className="h-4" width={16} height={16} />
                          {property.bedrooms > 0 ? `${property.bedrooms}-Bedroom` : "Bedroom"}
                        </span>

                        <span className="bg-[#1a1a1a] px-2 py-1 rounded-xl border border-[#262626] flex items-center gap-1">
                          <Image src="/building/Icon1.png" alt="" className="h-4" width={16} height={16} />
                          {property.bathrooms > 0 ? `${property.bathrooms}-Bathroom` : "Bathroom"}
                        </span>

                        <span className="bg-[#1a1a1a] px-2 py-1 rounded-xl border border-[#262626] flex items-center gap-1">
                          <Image src="/building/Icon2.png" alt="" className="h-4" width={16} height={16} />
                          {property.type}
                        </span>
                      </div>

                      <p className="font-semibold mb-3 text-2xl pt-3">
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
            <Link href="/listings">
              <div className="flex justify-end mt-6 gap-3">
                <button
                  // onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600"
                >
                  ←
                </button>
                <button
                  // onClick={() => setPage((p) => p + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600"
                >
                  →
                </button>
              </div>
            </Link>
          </div>
        </section>
      </div>
      {/* <a
        href="https://wa.me/971529323341"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
        title="Chat with us on WhatsApp"
      >
        <Image src="/whatsapp-icon.svg" alt="WhatsApp" width={28} height={28} />
      </a> */}

      {/* version 2 */}
      {/* <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2 group">
        <div className="bg-white text-black text-sm px-4 py-2 rounded-lg shadow-md max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          👋 Chat with us on WhatsApp!
        </div>

        <a
          href="https://wa.me/971529323341"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          title="Chat with us on WhatsApp"
        >
          <Image src="/whatsapp-icon.svg" alt="WhatsApp" width={28} height={28} />
        </a>
      </div> */}

      <Footer />
    </div>
  );
}