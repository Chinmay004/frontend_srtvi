"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";

interface PropertyLocation {
    id: string;
    title: string;
    location: string;
    latitude: number;
    longitude: number;
    developerName: string;
    price: number;
    type: string;
}

interface Props {
    properties: PropertyLocation[];
    height?: string;
}

// Map developer names to file names
const developerFileMap: Record<string, string> = {
    'Ellington': 'Ellingto',
    'Deyaar': 'Deyaar',
    'Omniyat': 'Omniyat',
    'Arada': 'Arada',
    'Damac': 'Damac',
    'Binghatti': 'BInghatti',
    'Meraas': 'Meraas',
    'Nakheel': 'Nakheel',
    'Azizi': 'Azizi',
};

// Create custom icon for each developer
const createCustomIcon = (developerName: string) => {
    const iconSize: [number, number] = [40, 40];
    const iconAnchor: [number, number] = [20, 40];

    const fileName = developerFileMap[developerName] || developerName;

    return L.divIcon({
        className: 'custom-marker',
        html: `
      <div style="
        width: 40px; 
        height: 40px; 
        background: white; 
        border-radius: 50%; 
        border: 3px solid #157cfb;
        display: flex; 
        align-items: center; 
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/devv/${fileName}.webp" 
          alt="${developerName}"
          style="width: 24px; height: 24px; object-fit: contain;"
          onerror="this.style.display='none'"
        />
      </div>
    `,
        iconSize,
        iconAnchor,
        popupAnchor: [0, -40],
    });
};

export default function HomeMap({ properties, height = "500px" }: Props) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        console.log("HomeMap mounted with properties:", properties?.length || 0);
    }, [properties]);

    if (!isClient) {
        return (
            <div style={{ height, width: "100%" }} className="bg-gray-200 rounded-lg flex items-center justify-center">
                <p>Loading map...</p>
            </div>
        );
    }

    if (!properties || properties.length === 0) {
        return (
            <div style={{ height, width: "100%" }} className="bg-gray-200 rounded-lg flex items-center justify-center">
                <p>No properties available for map display</p>
            </div>
        );
    }

    // Calculate center point from all properties
    const centerLat = properties.reduce((sum, prop) => sum + prop.latitude, 0) / properties.length;
    const centerLng = properties.reduce((sum, prop) => sum + prop.longitude, 0) / properties.length;

    // Group properties by developer
    const groupedProperties = properties.reduce((acc, property) => {
        const developer = property.developerName || 'Unknown';
        if (!acc[developer]) {
            acc[developer] = [];
        }
        acc[developer].push(property);
        return acc;
    }, {} as Record<string, PropertyLocation[]>);

    return (
        <MapContainer
            center={[centerLat, centerLng]}
            zoom={10}
            style={{ height, width: "100%" }}
            className="rounded-lg"
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a>'
                url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`}
            />

            {Object.entries(groupedProperties).map(([developer, devProperties]) => {
                const customIcon = createCustomIcon(developer);

                return devProperties.map((property) => (
                    <Marker
                        key={property.id}
                        position={[property.latitude, property.longitude]}
                        icon={customIcon}
                    >
                        <Popup>
                            <div className="p-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-semibold text-sm">{developer}</span>
                                </div>
                                <h3 className="font-bold text-lg mb-1">{property.title}</h3>
                                <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                                <p className="text-sm mb-1">
                                    <span className="font-semibold">Type:</span> {property.type}
                                </p>
                                <p className="text-sm mb-2">
                                    <span className="font-semibold">Price:</span> AED {property.price.toLocaleString()}
                                </p>
                                <a
                                    href={`/listings/${property.id}`}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                    View Details →
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                ));
            })}
        </MapContainer>
    );
} 