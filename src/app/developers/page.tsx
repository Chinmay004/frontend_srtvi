

// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Navbar from "@/component/layout/Navbar";
// import Footer from "@/component/layout/Footer";

// interface Developer {
//     id: number;
//     name: string;
//     logoUrl: string;
// }

// export default function DeveloperListPage() {
//     const [developers, setDevelopers] = useState<Developer[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [searchQuery, setSearchQuery] = useState("");

//     useEffect(() => {
//         const fetchDevelopers = async () => {
//             try {
//                 const res = await fetch("https://dataapi.pixxicrm.ae/pixxiapi/v1/developer/list", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "x-pixxi-token": "GwoU8j7WFPwaAUfCz7B6NAHFwMBaSLak",
//                     },
//                     body: JSON.stringify({
//                         name: "",
//                         page: 1,
//                         size: 10000,
//                     }),
//                 });

//                 const data = await res.json();
//                 setDevelopers(data.data.list || []);
//             } catch (error) {
//                 console.error("Failed to fetch developers:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchDevelopers();
//     }, []);

//     const filteredDevelopers = developers.filter((dev) =>
//         dev.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <div className="bg-black text-white min-h-screen">
//             <Navbar />

//             <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
//                 <h1 className="text-4xl font-semibold mb-10 text-center">Top Developers</h1>

//                 <div className="mb-10 flex justify-center">
//                     <input
//                         type="text"
//                         placeholder="Search developers..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full max-w-md px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-[#479aff] placeholder-gray-500"
//                     />
//                 </div>

//                 {loading ? (
//                     <div className="text-center py-20 text-gray-400">Loading developers...</div>
//                 ) : filteredDevelopers.length === 0 ? (
//                     <div className="text-center text-gray-500">No developers found.</div>
//                 ) : (
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//                         {filteredDevelopers.map((dev) => (
//                             <div
//                                 key={dev.id}
//                                 className="bg-[#141414] border border-[#262626] rounded-xl p-4 flex flex-col items-center text-center hover:shadow-lg transition"
//                             >
//                                 <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden bg-[#1e1e1e] border border-[#333]">
//                                     <Image
//                                         src={dev.logoUrl}
//                                         alt={dev.name}
//                                         fill
//                                         className="object-contain"
//                                     />
//                                 </div>
//                                 <h2 className="text-lg font-medium">{dev.name.trim()}</h2>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </section>

//             <Footer />
//         </div>
//     );
// }

//version 2 works great/search thing is also working, dropping it cause i need page to not reload
// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Navbar from "@/component/layout/Navbar";
// import Footer from "@/component/layout/Footer";
// import { useRouter, useSearchParams } from "next/navigation";

// interface Developer {
//     id: number;
//     name: string;
//     logoUrl: string;
// }


// export default function DeveloperListPage() {
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     const [developers, setDevelopers] = useState<Developer[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [searchQuery, setSearchQuery] = useState("");

//     useEffect(() => {
//         // Read "search" param from URL
//         const initialSearch = searchParams.get("search");
//         if (initialSearch) {
//             setSearchQuery(initialSearch);
//         }
//     }, [searchParams]);

//     useEffect(() => {
//         const fetchDevelopers = async () => {
//             try {
//                 const res = await fetch("https://dataapi.pixxicrm.ae/pixxiapi/v1/developer/list", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "x-pixxi-token": "GwoU8j7WFPwaAUfCz7B6NAHFwMBaSLak",
//                     },
//                     body: JSON.stringify({
//                         name: "",
//                         page: 1,
//                         size: 10000,
//                     }),
//                 });

//                 const data = await res.json();
//                 setDevelopers(data.data.list || []);
//             } catch (error) {
//                 console.error("Failed to fetch developers:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchDevelopers();
//     }, []);

//     const filteredDevelopers = developers.filter((dev) =>
//         dev.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const handleSearch = (query: string) => {
//         setSearchQuery(query);
//         const encoded = encodeURIComponent(query);
//         router.push(`/developers?search=${encoded}`);
//     };

//     return (
//         <div className="bg-black text-white min-h-screen">
//             <Navbar />

//             <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
//                 <h1 className="text-4xl font-semibold mb-10 text-center">Top Developers</h1>

//                 <div className="mb-10 flex justify-center">
//                     <input
//                         type="text"
//                         placeholder="Search developers..."
//                         value={searchQuery}
//                         onChange={(e) => handleSearch(e.target.value)}
//                         className="w-full max-w-md px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-[#479aff] placeholder-gray-500"
//                     />
//                 </div>

//                 {loading ? (
//                     <div className="text-center py-20 text-gray-400">Loading developers...</div>
//                 ) : filteredDevelopers.length === 0 ? (
//                     <div className="text-center text-gray-500">No developers found.</div>
//                 ) : (
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//                         {filteredDevelopers.map((dev) => (
//                             <div
//                                 key={dev.id}
//                                 onClick={() => router.push(`/listings?search=${encodeURIComponent(dev.name)}`)}
//                                 className="bg-[#141414] border border-[#262626] rounded-xl p-4 flex flex-col items-center text-center hover:shadow-lg hover:cursor-pointer transition"
//                             >
//                                 <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden bg-[#1e1e1e] border border-[#333]">
//                                     <Image
//                                         src={dev.logoUrl}
//                                         alt={dev.name}
//                                         fill
//                                         className="object-contain"
//                                     />
//                                 </div>
//                                 <h2 className="text-lg font-medium">{dev.name.trim()}</h2>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </section>

//             <Footer />
//         </div>
//     );
// }


//version3 works greate dropping it for developers

// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Navbar from "@/component/layout/Navbar";

// interface Developer {
//     id: string;
//     name: string;
//     logoUrl: string;
// }

// export default function DevelopersPage() {
//     const [developers, setDevelopers] = useState<Developer[]>([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();

//     useEffect(() => {
//         const now = Date.now();
//         const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

//         const cachedData = sessionStorage.getItem("cachedDevelopers");
//         const lastFetched = sessionStorage.getItem("developersLastFetched");

//         const isCacheValid =
//             cachedData &&
//             lastFetched &&
//             now - parseInt(lastFetched) < CACHE_DURATION;

//         if (isCacheValid) {
//             try {
//                 const parsed = JSON.parse(cachedData!);
//                 const safeParsed = Array.isArray(parsed) ? parsed : [];
//                 setDevelopers(safeParsed);
//                 setLoading(false);
//                 return;
//             } catch (e) {
//                 console.error("Failed to parse cached developers:", e);
//             }
//         }

//         const fetchData = async () => {
//             try {
//                 const res = await fetch(
//                     "https://dataapi.pixxicrm.ae/pixxiapi/v1/developer/list",
//                     {
//                         method: "POST",
//                         headers: {
//                             "x-pixxi-token": "GwoU8j7WFPwaAUfCz7B6NAHFwMBaSLak",
//                             "Content-Type": "application/json",
//                         },
//                         body: JSON.stringify({ name: "", page: 1, size: 10000 }),
//                     }
//                 );

//                 const data = await res.json();
//                 console.log("👀 Developer API response:", data);

//                 const safeDevelopers = Array.isArray(data?.data?.list) ? data.data.list : [];

//                 setDevelopers(safeDevelopers);
//                 setLoading(false);

//                 sessionStorage.setItem(
//                     "cachedDevelopers",
//                     JSON.stringify(safeDevelopers)
//                 );
//                 console.log("✅ Cached developers:", JSON.parse(sessionStorage.getItem("cachedDevelopers") || "[]"));

//                 sessionStorage.setItem("developersLastFetched", now.toString());
//             } catch (error) {
//                 console.error("Error fetching developers:", error);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const filteredDevelopers = developers.filter((dev) =>
//         dev.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (



//         <div className="min-h-screen bg-black text-white  pb-24 px-4">
//             <Navbar />
//             <div className="flex  my-20 gap-6 max-w-6xl justify-center items-center mx-auto ">

//                 <h1 className="text-3xl sm:text-5xl font-bold  text-center justify-center items-center h-full w-full ">
//                     Developers
//                 </h1>

//                 <div className="max-w-xl mx-auto  flex  justify-center rounded-xl items-center h-full w-full">
//                     <input
//                         type="text"
//                         placeholder="Search developers..."
//                         className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </div>
//             </div>


//             {loading ? (
//                 <p className="text-center text-gray-400">Loading developers...</p>
//             ) : (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
//                     {filteredDevelopers.map((dev) => (
//                         <div
//                             key={dev.id}
//                             onClick={() =>
//                                 router.push(
//                                     `/listings?search=${encodeURIComponent(dev.name)}`
//                                 )
//                             }
//                             className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 hover:shadow-xl hover:scale-105 transition cursor-pointer flex flex-col items-center"
//                         >
//                             <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4">
//                                 <Image
//                                     src={dev.logoUrl}
//                                     alt={dev.name}
//                                     fill
//                                     className="object-contain"
//                                 />
//                             </div>
//                             <p className="text-center font-semibold text-sm sm:text-base">
//                                 {dev.name}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>

//     );
// }


//version 4

// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Navbar from "@/component/layout/Navbar";
// import debounce from "lodash.debounce";

// interface Developer {
//     id: string;
//     name: string;
//     logoUrl: string;
// }

// export default function DevelopersPage() {
//     const [developers, setDevelopers] = useState<Developer[]>([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();
//     const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

//     const fetchDevelopers = async (search: string) => {
//         setLoading(true);
//         try {
//             const now = Date.now();

//             // Use cache only if no search term
//             if (!search) {
//                 const cachedData = sessionStorage.getItem("cachedDevelopers");
//                 const lastFetched = sessionStorage.getItem("developersLastFetched");

//                 const isCacheValid =
//                     cachedData &&
//                     lastFetched &&
//                     now - parseInt(lastFetched) < CACHE_DURATION;

//                 if (isCacheValid) {
//                     const parsed = JSON.parse(cachedData!);
//                     const safeParsed = Array.isArray(parsed) ? parsed : [];
//                     setDevelopers(safeParsed);
//                     setLoading(false);
//                     return;
//                 }
//             }

//             const res = await fetch("https://dataapi.pixxicrm.ae/pixxiapi/v1/developer/list", {
//                 method: "POST",
//                 headers: {
//                     "x-pixxi-token": "GwoU8j7WFPwaAUfCz7B6NAHFwMBaSLak",
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     name: search,
//                     page: 1,
//                     size: 10000,
//                 }),
//             });

//             const data = await res.json();
//             const safeDevelopers = Array.isArray(data?.data?.list) ? data.data.list : [];
//             setDevelopers(safeDevelopers);
//             setLoading(false);

//             if (!search) {
//                 sessionStorage.setItem("cachedDevelopers", JSON.stringify(safeDevelopers));
//                 sessionStorage.setItem("developersLastFetched", now.toString());
//             }
//         } catch (error) {
//             console.error("Error fetching developers:", error);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchDevelopers("");
//     }, []);

//     const debouncedSearch = debounce((value: string) => {
//         fetchDevelopers(value);
//     }, 400);

//     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setSearchTerm(value);
//         debouncedSearch(value);
//     };

//     return (
//         <div className="min-h-screen bg-black text-white pb-24 px-4">
//             <Navbar />
//             <div className="flex my-20 gap-6 max-w-6xl justify-center items-center mx-auto">
//                 <h1 className="text-3xl sm:text-5xl font-bold text-center justify-center items-center h-full w-full">
//                     Developers
//                 </h1>

//                 <div className="max-w-xl mx-auto flex justify-center rounded-xl items-center h-full w-full">
//                     <input
//                         type="text"
//                         placeholder="Search developers..."
//                         className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none"
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                     />
//                 </div>
//             </div>

//             {loading ? (
//                 <p className="text-center text-gray-400">Loading developers...</p>
//             ) : (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
//                     {developers.map((dev) => (
//                         <div
//                             key={dev.id}
//                             onClick={() =>
//                                 router.push(`/listings?search=${encodeURIComponent(dev.name)}`)
//                             }
//                             className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 hover:shadow-xl hover:scale-105 transition cursor-pointer flex flex-col items-center"
//                         >
//                             <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4">
//                                 <Image
//                                     src={dev.logoUrl}
//                                     alt={dev.name}
//                                     fill
//                                     className="object-contain"
//                                 />
//                             </div>
//                             <p className="text-center font-semibold text-sm sm:text-base">
//                                 {dev.name}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }


// //version 5

// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Navbar from "@/component/layout/Navbar";
// import debounce from "lodash.debounce";
// import Footer from "@/component/layout/Footer";
// import { FiSearch } from 'react-icons/fi';


// interface Developer {
//     id: string;
//     name: string;
//     logoUrl: string;
// }

// const ITEMS_PER_PAGE = 20;

// export default function DevelopersPage() {
//     const [developers, setDevelopers] = useState<Developer[]>([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [imgError, setImgError] = useState(false);

//     const router = useRouter();
//     const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

//     const fetchDevelopers = async (search: string) => {
//         setLoading(true);
//         try {
//             const now = Date.now();

//             if (!search) {
//                 const cachedData = sessionStorage.getItem("cachedDevelopers");
//                 const lastFetched = sessionStorage.getItem("developersLastFetched");

//                 const isCacheValid =
//                     cachedData &&
//                     lastFetched &&
//                     now - parseInt(lastFetched) < CACHE_DURATION;

//                 if (isCacheValid) {
//                     const parsed = JSON.parse(cachedData!);
//                     const safeParsed = Array.isArray(parsed) ? parsed : [];
//                     setDevelopers(safeParsed);
//                     setLoading(false);
//                     return;
//                 }
//             }

//             const res = await fetch("https://dataapi.pixxicrm.ae/pixxiapi/v1/developer/list", {
//                 method: "POST",
//                 headers: {
//                     "x-pixxi-token": "GwoU8j7WFPwaAUfCz7B6NAHFwMBaSLak",
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     name: search,
//                     page: 1,
//                     size: 10000,
//                 }),
//             });

//             const data = await res.json();
//             const safeDevelopers = Array.isArray(data?.data?.list) ? data.data.list : [];
//             setDevelopers(safeDevelopers);
//             setLoading(false);

//             if (!search) {
//                 sessionStorage.setItem("cachedDevelopers", JSON.stringify(safeDevelopers));
//                 sessionStorage.setItem("developersLastFetched", now.toString());
//             }
//         } catch (error) {
//             console.error("Error fetching developers:", error);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchDevelopers("");
//     }, []);

//     const debouncedSearch = debounce((value: string) => {
//         setCurrentPage(1); // reset to first page on search
//         fetchDevelopers(value);
//     }, 400);

//     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setSearchTerm(value);
//         debouncedSearch(value);
//     };

//     const totalPages = Math.ceil(developers.length / ITEMS_PER_PAGE);
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     const currentDevelopers = developers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

//     const handlePageChange = (page: number) => {
//         if (page < 1 || page > totalPages) return;
//         setCurrentPage(page);
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     };

//     return (
//         <div className="min-h-screen bg-black text-white pb-24 px-4">
//             <Navbar />

//             <div>
//                 <div className="relative w-full h-[30vh] overflow-hidden">
//                     <Image
//                         src="/sunset.jpg"
//                         alt="Hero Image"
//                         fill
//                         priority
//                         className="object-cover"
//                     />
//                     <div className="absolute inset-0 bg-black/70 z-10 flex flex-col justify-center items-center text-center px-4">
//                         <h1 className="text-4xl sm:text-5xl font-bold mb-2">
//                             Top{" "}
//                             <span className="text-[#e0b973]">Developers</span>
//                         </h1>
//                         <p className="max-w-xl text-gray-300 text-sm">
//                             Explore Top Developers properties in Dubai.
//                         </p>
//                     </div>
//                 </div>



//                 <div className="flex my-20 gap-6 max-w-6xl justify-center items-center mx-auto">

//                     {/* <h1 className="text-3xl sm:text-5xl font-bold text-center justify-center items-center h-full w-full">
//                         Developers
//                     </h1> */}

//                     <div className="max-w-xl mx-auto flex justify-center rounded-xl items-center h-full w-full bg-zinc-800 px-">
//                         <FiSearch />
//                         <input
//                             type="text"
//                             placeholder="Search developers..."
//                             className="w-full px-4 py-3 rounded-lg  text-white placeholder-gray-400 focus:outline-none"
//                             value={searchTerm}
//                             onChange={handleSearchChange}
//                         />

//                     </div>
//                 </div>

//                 {loading ? (
//                     <p className="text-center text-gray-400">Loading developers...</p>
//                 ) : currentDevelopers.length === 0 ? (
//                     <p className="text-center text-gray-500">No developers found.</p>
//                 ) : (
//                     <>
//                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
//                             {currentDevelopers.map((dev) => (
//                                 <div
//                                     key={dev.id}
//                                     onClick={() =>
//                                         router.push(`/listings?search=${encodeURIComponent(dev.name)}`)
//                                     }
//                                     className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 hover:shadow-xl hover:scale-105 transition cursor-pointer flex flex-col items-center"
//                                 >
//                                     <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4 ">
//                                         <Image
//                                             src={dev.logoUrl} // ✅ Notice the leading slash
//                                             alt={dev.name}
//                                             fill
//                                             className="object-contain rounded-full"
//                                         />

//                                     </div>

//                                     {/* <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4 rounded-full overflow-hidden bg-white/10">
//                                         <Image
//                                             src={imgError ? "/black.svg" : dev.logoUrl}
//                                             alt={dev.name}
//                                             fill
//                                             className="object-contain rounded-full"
//                                             onError={() => setImgError(true)}
//                                         />
//                                     </div> */}
//                                     <p className="text-center font-semibold text-sm sm:text-base">
//                                         {dev.name}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Pagination */}
//                         <div className="flex lg:justify-end justify-center  items-center  gap-2 mt-12 w-full  md:max-w-7xl m-auto">
//                             <button
//                                 onClick={() => handlePageChange(currentPage - 1)}
//                                 disabled={currentPage === 1}
//                                 className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-40 transition"
//                             >
//                                 Previous
//                             </button>

//                             <span className="px-4 py-2 text-gray-300">
//                                 Page {currentPage} of {totalPages}
//                             </span>

//                             <button
//                                 onClick={() => handlePageChange(currentPage + 1)}
//                                 disabled={currentPage === totalPages}
//                                 className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-40 transition"
//                             >
//                                 Next
//                             </button>
//                         </div>
//                     </>
//                 )}
//             </div>
//             <Footer />

//         </div>
//     );
// }


//version  past
"use client";

import { useEffect, useState, useCallback, } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/component/layout/Navbar";
import debounce from "lodash.debounce";
import { FiSearch } from 'react-icons/fi';


interface Developer {
    id: string;
    name: string;
    logoUrl: string;
}

const ITEMS_PER_PAGE = 20;

export default function DevelopersPage() {
    const [developers, setDevelopers] = useState<Developer[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    // const fetchDevelopers = async (search: string) => {
    //     setLoading(true);
    //     try {
    //         const now = Date.now();

    //         if (!search) {
    //             const cachedData = sessionStorage.getItem("cachedDevelopers");
    //             const lastFetched = sessionStorage.getItem("developersLastFetched");

    //             const isCacheValid =
    //                 cachedData &&
    //                 lastFetched &&
    //                 now - parseInt(lastFetched) < CACHE_DURATION;

    //             if (isCacheValid) {
    //                 const parsed = JSON.parse(cachedData!);
    //                 const safeParsed = Array.isArray(parsed) ? parsed : [];
    //                 setDevelopers(safeParsed);
    //                 setLoading(false);
    //                 return;
    //             }
    //         }

    //         const res = await fetch("https://dataapi.pixxicrm.ae/pixxiapi/v1/developer/list", {
    //             method: "POST",
    //             headers: {
    //                 "x-pixxi-token": "GwoU8j7WFPwaAUfCz7B6NAHFwMBaSLak",
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 name: search,
    //                 page: 1,
    //                 size: 10000,
    //             }),
    //         });

    //         const data = await res.json();
    //         const safeDevelopers = Array.isArray(data?.data?.list) ? data.data.list : [];
    //         setDevelopers(safeDevelopers);
    //         setLoading(false);

    //         if (!search) {
    //             sessionStorage.setItem("cachedDevelopers", JSON.stringify(safeDevelopers));
    //             sessionStorage.setItem("developersLastFetched", now.toString());
    //         }
    //     } catch (error) {
    //         console.error("Error fetching developers:", error);
    //         setLoading(false);
    //     }
    // };



    const fetchDevelopers = useCallback(async (search: string) => {
        setLoading(true);
        try {
            const now = Date.now();

            if (!search) {
                const cachedData = sessionStorage.getItem("cachedDevelopers");
                const lastFetched = sessionStorage.getItem("developersLastFetched");

                const isCacheValid =
                    cachedData &&
                    lastFetched &&
                    now - parseInt(lastFetched) < CACHE_DURATION;

                if (isCacheValid) {
                    const parsed = JSON.parse(cachedData!);
                    const safeParsed = Array.isArray(parsed) ? parsed : [];
                    setDevelopers(safeParsed);
                    setLoading(false);
                    return;
                }
            }

            const res = await fetch("https://dataapi.pixxicrm.ae/pixxiapi/v1/developer/list", {
                method: "POST",
                headers: {
                    "x-pixxi-token": "GwoU8j7WFPwaAUfCz7B6NAHFwMBaSLak",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: search,
                    page: 1,
                    size: 10000,
                }),
            });

            const data = await res.json();
            const safeDevelopers = Array.isArray(data?.data?.list) ? data.data.list : [];
            setDevelopers(safeDevelopers);
            setLoading(false);

            if (!search) {
                sessionStorage.setItem("cachedDevelopers", JSON.stringify(safeDevelopers));
                sessionStorage.setItem("developersLastFetched", now.toString());
            }
        } catch (error) {
            console.error("Error fetching developers:", error);
            setLoading(false);
        }
    }, [CACHE_DURATION]);

    useEffect(() => {
        fetchDevelopers("");
    }, [fetchDevelopers]);

    const debouncedSearch = debounce((value: string) => {
        setCurrentPage(1); // reset to first page on search
        fetchDevelopers(value);
    }, 400);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    const totalPages = Math.ceil(developers.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentDevelopers = developers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (

        <div className="min-h-screen bg-black text-white pb-24 px-4">
            <Navbar />

            <div>

                <div className="relative w-full h-[30vh] overflow-hidden">
                    <Image
                        src="/sunset.jpg"
                        alt="Hero Image"
                        fill
                        priority
                        className="object-cover "
                    />
                    <div className="absolute inset-0 bg-black/70 z-10 flex flex-col justify-center items-center text-center px-4">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-2">
                            Top{" "}
                            <span className="text-[#e0b973]">Developers</span>
                        </h1>
                        <p className="max-w-xl text-gray-300 text-sm">
                            Explore Top Developers properties in Dubai.
                        </p>
                    </div>
                </div>

                <div className="flex my-20 gap-6 max-w-6xl justify-center items-center mx-auto">
                    {/* <h1 className="text-3xl sm:text-5xl font-bold text-center justify-center items-center h-full w-full">
                        Developers
                    </h1> */}

                    <div className="max-w-xl mx-auto flex justify-center rounded-xl items-center h-full w-full bg-zinc-800 pl-5">
                        <FiSearch />
                        <input
                            type="text"
                            placeholder="Search developers..."
                            className="w-full px-4 py-3 rounded-lg  text-white placeholder-gray-400 focus:outline-none"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                {loading ? (
                    <p className="text-center text-gray-400">Loading developers...</p>
                ) : currentDevelopers.length === 0 ? (
                    <p className="text-center text-gray-500">No developers found.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                            {currentDevelopers.map((dev) => (
                                <div
                                    key={dev.id}
                                    onClick={() =>
                                        router.push(`/listings?search=${encodeURIComponent(dev.name)}`)
                                    }
                                    className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 hover:shadow-xl hover:scale-105 transition cursor-pointer flex flex-col items-center"
                                >
                                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4">
                                        <Image
                                            src={dev.logoUrl}
                                            alt={dev.name}
                                            fill
                                            className="object-contain rounded-full"
                                        />
                                    </div>
                                    <p className="text-center font-semibold text-sm sm:text-base">
                                        {dev.name}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center gap-2 mt-12">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-40 transition"
                            >
                                Previous
                            </button>

                            <span className="px-4 py-2 text-gray-300">
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-40 transition"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
