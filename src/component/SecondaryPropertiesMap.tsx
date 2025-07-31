"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";

// Dynamically import the map components to avoid SSR issues
const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false }
);
const Popup = dynamic(
    () => import("react-leaflet").then((mod) => mod.Popup),
    { ssr: false }
);

interface Property {
    id: string;
    propertyId: number;
    title: string;
    description: string;
    location: string;
    latitude: number;
    longitude: number;
    bedrooms: number;
    bathrooms: number;
    type: string;
    price: number;
    images: string[];
    developer: string;
    marketType: 'secondary' | 'offPlan';
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
    listingType?: string;
}

interface Developer {
    id: string;
    name: string;
    logoUrl: string;
}

export default function SecondaryPropertiesMap() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [, setDevelopers] = useState<Developer[]>([]);
    const [developerLogos, setDeveloperLogos] = useState<Record<string, string>>({});

    // Dubai area coordinates mapping for properties without coordinates
    const DUBAI_AREAS: Record<string, [number, number]> = {
        'Downtown Dubai': [25.1972, 55.2744],
        'Dubai Marina': [25.0920, 55.1386],
        'Palm Jumeirah': [25.1122, 55.1386],
        'Arabian Ranches 3': [25.0553, 55.2203],
        'Town Square': [25.1189, 55.3788],
        'Dubai Hills Estate': [25.0553, 55.2203],
        'Dubai Silicon Oasis': [25.1189, 55.3788],
        'Business Bay': [25.1867, 55.2744],
        'Jumeirah Village Circle': [25.0553, 55.2203],
        'Dubai Sports City': [25.0553, 55.2203],
        'Dubai Production City': [25.1189, 55.3788],
        'Dubai International City': [25.1189, 55.3788],
        'Dubai Creek Harbour': [25.1972, 55.2744],
        'Dubai South': [25.0553, 55.2203],
        'Dubai World Central': [25.0553, 55.2203],
        // Add more common Dubai areas
        'Jumeirah': [25.1972, 55.2744],
        'Al Barsha': [25.0920, 55.1386],
        'Al Quoz': [25.1122, 55.1386],
        'Al Safa': [25.0553, 55.2203],
        'Al Wasl': [25.1189, 55.3788],
        'Umm Suqeim': [25.0553, 55.2203],
        'Al Sufouh': [25.1189, 55.3788],
        'Al Manara': [25.1867, 55.2744],
        'Al Thanya': [25.0553, 55.2203],
        'Al Hudaiba': [25.0553, 55.2203],
        'Al Satwa': [25.1189, 55.3788],
        'Al Karama': [25.1189, 55.3788],
        'Al Mankhool': [25.1972, 55.2744],
        'Al Raffa': [25.0553, 55.2203],
        'Al Jafiliya': [25.0553, 55.2203],
        'Al Muteena': [25.1189, 55.3788],
        'Al Twar': [25.1972, 55.2744],
        'Al Nahda': [25.0553, 55.2203],
        'Al Warqa': [25.1189, 55.3788],
        'Al Rashidiya': [25.1189, 55.3788],
        'Al Lisaili': [25.1972, 55.2744],
        'Al Aweer': [25.0553, 55.2203],
        'Al Khawaneej': [25.0553, 55.2203],
        'Al Mizhar': [25.1189, 55.3788],
        'Al Barsha 1': [25.1189, 55.3788],
        'Al Barsha 2': [25.1972, 55.2744],
        'Al Barsha 3': [25.0553, 55.2203],
        'Al Barsha South': [25.0553, 55.2203],
        'Al Barsha Heights': [25.1189, 55.3788],
        'Emirates Hills': [25.1189, 55.3788],
        'Springs': [25.1972, 55.2744],
        'Meadows': [25.0553, 55.2203],
        'Lakes': [25.0553, 55.2203],
        'Gardens': [25.1189, 55.3788],
        'Greens': [25.1189, 55.3788],
        'Views': [25.1972, 55.2744],
        'Heights': [25.0553, 55.2203],
        'Marina': [25.0920, 55.1386],
        'Beach': [25.1122, 55.1386],
        'Hills': [25.0553, 55.2203],
        'Estate': [25.1189, 55.3788],
        'Village': [25.1867, 55.2744],
        'Circle': [25.0553, 55.2203],
        'City': [25.0553, 55.2203],
        'District': [25.1189, 55.3788],
        'Area': [25.1189, 55.3788],
        'Zone': [25.1972, 55.2744],
        'Community': [25.0553, 55.2203],
        'Development': [25.0553, 55.2203],
        'Project': [25.1189, 55.3788],
        'Residence': [25.1189, 55.3788],
        'Tower': [25.1972, 55.2744],
        'Building': [25.0553, 55.2203],
        'Complex': [25.0553, 55.2203],
        'Plaza': [25.1189, 55.3788],
        'Center': [25.1189, 55.3788],
        'Mall': [25.1972, 55.2744],
        'Street': [25.0553, 55.2203],
        'Road': [25.0553, 55.2203],
        'Avenue': [25.1189, 55.3788],
        'Boulevard': [25.1189, 55.3788],
        'Drive': [25.1972, 55.2744],
        'Lane': [25.0553, 55.2203],
        'Way': [25.0553, 55.2203],
        'Square': [25.1189, 55.3788],
        'Park': [25.1189, 55.3788],
        'Garden': [25.1972, 55.2744],
        'View': [25.0553, 55.2203],
        'Point': [25.0553, 55.2203],
        'Bay': [25.1189, 55.3788],
        'Island': [25.0553, 55.2203],
        'Palm': [25.1122, 55.1386],
        'Dubai': [25.2048, 55.2708],
    };

    // Fetch developers and their logos
    useEffect(() => {
        const fetchDevelopers = async () => {
            try {
                const res = await fetch("https://dataapi.pixxicrm.ae/pixxiapi/v1/developer/list", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-pixxi-token": "GwoU8j7WFPwaAUfCz7B6NAHFwMBaSLak",
                    },
                    body: JSON.stringify({
                        name: "",
                        page: 1,
                        size: 10000,
                    }),
                });

                const data = await res.json();
                const developersList = data.data?.list || [];
                setDevelopers(developersList);

                // Create a mapping of developer names to logo URLs
                const logosMap: Record<string, string> = {};
                developersList.forEach((dev: Developer) => {
                    logosMap[dev.name.trim().toLowerCase()] = dev.logoUrl;
                });
                setDeveloperLogos(logosMap);
            } catch (error) {
                console.error("Failed to fetch developers:", error);
            }
        };

        fetchDevelopers();
    }, []);

    useEffect(() => {
        const fetchSecondaryProperties = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/listings/pixxi`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-PIXXI-TOKEN": "GwoU8j7WFPwaAUfCz7B6NAHFwMBaSLak",
                    },
                    body: JSON.stringify({
                        page: 1,
                        limit: 100, // Match your curl request
                        search: "",
                        marketType: 'secondary', // Filter for secondary market only
                    }),
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log("Secondary properties data:", data);

                    // Map the data to the format expected by the map component
                    const mappedProperties: Property[] = data.records.map((item: APIListing, index: number) => {
                        const region = item.region || "N/A";
                        let coordinates = DUBAI_AREAS[region];

                        // If no specific coordinates found, create unique coordinates based on index
                        if (!coordinates) {
                            // Create a more spread out pattern to avoid overlapping
                            const baseLat = 25.2048;
                            const baseLng = 55.2708;
                            const gridSize = 0.02; // Larger offset for better separation
                            const gridIndex = index % 25; // Use modulo to keep within reasonable bounds

                            coordinates = [
                                baseLat + (gridIndex % 5) * gridSize,
                                baseLng + Math.floor(gridIndex / 5) * gridSize
                            ];
                        }

                        const property = {
                            id: String(item.propertyId),
                            propertyId: item.propertyId,
                            title: item.title,
                            description: item.description,
                            location: region,
                            latitude: coordinates[0],
                            longitude: coordinates[1],
                            developer: item.developer || "N/A",
                            price: item.price,
                            type: item.propertyType?.[0] || 'Property',
                            images: item.images,
                            bedrooms: item.bedrooms || 0,
                            bathrooms: item.bedrooms || 0, // Using bedrooms as bathrooms for now
                            marketType: item.listingType === 'NEW' ? 'offPlan' : 'secondary'
                        };

                        console.log(`Property ${index + 1}: ${item.title} at ${region} -> [${coordinates[0]}, ${coordinates[1]}]`);

                        return property;
                    });

                    console.log(`Total properties mapped: ${mappedProperties.length}`);
                    console.log(`Unique coordinates: ${new Set(mappedProperties.map(p => `${p.latitude},${p.longitude}`)).size}`);
                    setProperties(mappedProperties);
                } else {
                    console.error("Failed to fetch secondary properties");
                    console.error("Response status:", res.status);
                }
            } catch (error) {
                console.error("Error fetching secondary properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSecondaryProperties();
    }, [DUBAI_AREAS]);

    // Function to capitalize first letter of each word
    const capitalizeWords = (str: string) => {
        return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    };

    // Create custom round marker icon with developer logo and colored border
    const createPropertyIcon = (property: Property) => {
        // Use developer name or region name for properties without developer
        const displayName = property.developer !== "N/A" ? property.developer : property.location;
        const developerName = displayName.toLowerCase();
        const logoUrl = developerLogos[developerName] || "/white-logo.svg"; // Fallback to white logo

        // Generate a consistent color for each developer
        const developerColors = [
            '#e0b973', // Gold
            '#4CAF50', // Green
            '#2196F3', // Blue
            '#9C27B0', // Purple
            '#FF5722', // Orange
            '#00BCD4', // Cyan
            '#FF9800', // Amber
            '#795548', // Brown
            '#607D8B', // Blue Grey
            '#E91E63', // Pink
            '#3F51B5', // Indigo
            '#009688', // Teal
            '#FFC107', // Yellow
            '#8BC34A', // Light Green
            '#FFEB3B', // Yellow
            '#CDDC39', // Lime
            '#FF5722', // Deep Orange
            '#9E9E9E', // Grey
            '#673AB7', // Deep Purple
            '#3F51B5'  // Indigo
        ];

        // Create a hash from developer name to get consistent color
        let hash = 0;
        for (let i = 0; i < developerName.length; i++) {
            hash = developerName.charCodeAt(i) + ((hash << 5) - hash);
        }
        const colorIndex = Math.abs(hash) % developerColors.length;
        const borderColor = developerColors[colorIndex];

        return L.divIcon({
            className: 'custom-property-marker',
            html: `
        <div style="
          width: 40px;
          height: 40px;
          background: ${borderColor};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        ">
          <div style="
            width: 36px;
            height: 36px;
            background: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          ">
            ${logoUrl !== "/white-logo.svg" ? `
              <img 
                src="${logoUrl}" 
                alt="${displayName}"
                style="
                  width: 34px;
                  height: 34px;
                  object-fit: contain;
                  border-radius: 50%;
                "
                onerror="this.src='/white-logo.svg'"
              />
                         ` : `
               <div style="
                 font-size: 6px;
                 font-weight: bold;
                 color: #333;
                 text-align: center;
                 line-height: 1.1;
                 max-width: 32px;
                 overflow: hidden;
                 text-overflow: ellipsis;
                 white-space: nowrap;
                 font-family: Arial, sans-serif;
                 padding: 1px;
               ">
                 ${displayName.length > 12 ? displayName.substring(0, 12) + '...' : displayName}
               </div>
             `}
          </div>
        </div>
      `,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-white">Loading secondary properties...</div>
            </div>
        );
    }

    if (properties.length === 0) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-white">No secondary properties available</div>
            </div>
        );
    }

    // Calculate center point for the map
    const centerLat = properties.reduce((sum, prop) => sum + prop.latitude, 0) / properties.length;
    const centerLng = properties.reduce((sum, prop) => sum + prop.longitude, 0) / properties.length;

    return (
        <div className="w-full h-[600px] rounded-lg overflow-hidden">
            <MapContainer
                center={[centerLat, centerLng]}
                zoom={10}
                style={{ height: "100%", width: "100%" }}
                className="rounded-lg"
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a>'
                    url={`https://api.maptiler.com/maps/streets-dark/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`}
                />

                {properties.map((property) => (
                    <Marker
                        key={property.id}
                        position={[property.latitude, property.longitude]}
                        icon={createPropertyIcon(property)}
                    >
                        <Popup>
                            <Link href={`/listings/${property.id}`}>
                                <div
                                    className="property-popup cursor-pointer hover:opacity-90 transition-opacity"
                                    style={{
                                        minWidth: "250px",
                                        minHeight: "150px",
                                        backgroundImage: `url(${property.images?.[0] || '/fallback.jpg'})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        position: 'relative',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        border: '1px solid #333'
                                    }}
                                >
                                    {/* Dark overlay for text readability */}
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'rgba(0, 0, 0, 0.7)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        padding: '16px'
                                    }}>
                                        <div className="text-white">
                                            <p className="text-sm font-semibold text-gray-300 mb-2">
                                                {capitalizeWords(property.title)}
                                            </p>
                                            <p className="text-xl font-bold text-white">
                                                AED {property.price.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
} 