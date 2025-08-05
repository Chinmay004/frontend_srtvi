
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
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
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
