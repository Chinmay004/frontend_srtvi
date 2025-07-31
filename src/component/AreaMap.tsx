"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

interface DeveloperSummary {
    name: string;
    properties: number;
    priceRange: string;
    propertyTypes: string[];
    featuredProperty?: {
        id: string;
        title: string;
        price: number;
        propertyId: string;
    };
}

interface AreaData {
    name: string;
    coordinates: [number, number];
    developers: DeveloperSummary[];
    totalProperties: number;
    averagePrice: number;
}

interface FeaturedProperty {
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
    areas: AreaData[];
    featuredProperties: FeaturedProperty[];
    height?: string;
}

// Map developer names to file names
// const developerFileMap: Record<string, string> = {
//     'Ellington': 'Ellingto',
//     'Deyaar': 'Deyaar',
//     'Omniyat': 'Omniyat',
//     'Arada': 'Arada',
//     'Damac': 'Damac',
//     'Binghatti': 'BInghatti',
//     'Meraas': 'Meraas',
//     'Nakheel': 'Nakheel',
//     'Azizi': 'Azizi',
//     'Emaar': 'Emaar',
//     'Nshama': 'Nshama',
// };

// Create modern area marker
const createAreaMarker = (area: AreaData) => {
    const totalDevs = area.developers.length;

    // Real estate icons
    const icons = [
        '🏢', // Office building
        '🏠', // House
        '🏘️', // Houses
        '🏗️', // Construction
        '🏭', // Factory
        '🏪', // Convenience store
        '🏨', // Hotel
        '🏰', // Castle
        '🏛️', // Classical building
        '🏙️', // Cityscape
        '🏡', // House with garden
        '🏚️', // Derelict house
        '🏖️', // Beach with umbrella
        '🏕️', // Camping
        '🏔️', // Mountain
    ];

    // Use area name to generate consistent icon for each area
    // Create a hash from the area name to ensure better distribution
    const nameHash = area.name.split('').reduce((hash, char) => {
        return char.charCodeAt(0) + ((hash << 5) - hash);
    }, 0);
    const iconIndex = Math.abs(nameHash) % icons.length;
    const selectedIcon = icons[iconIndex];

    return L.divIcon({
        className: 'area-marker',
        html: `
      <div style="
        width: 48px; 
        height: 48px; 
        background: linear-gradient(135deg, #111827, #1f2937);
        border-radius: 50%; 
        border: 3px solid white;
        display: flex; 
        align-items: center; 
        justify-content: center;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        transform: translateZ(0);
        will-change: transform;
      ">
        <div style="
          font-size: 20px;
          text-align: center;
          line-height: 1;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
          z-index: 1;
          position: relative;
          transform: translateZ(0);
          will-change: transform;
        ">
          ${selectedIcon}
        </div>
        <div style="
          position: absolute;
          top: -6px;
          right: -6px;
          background: linear-gradient(135deg, #6b7280, #9ca3af);
          color: white;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          font-weight: bold;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          z-index: 2;
          transform: translateZ(0);
          will-change: transform;
        ">${totalDevs}</div>
      </div>
    `,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24],
    });
};

// Create modern featured property marker
// const createFeaturedMarker = (property: FeaturedProperty) => {
//     const fileName = developerFileMap[property.developerName] || property.developerName;

//     return L.divIcon({
//         className: 'featured-marker',
//         html: `
//       <div style="
//         width: 40px; 
//         height: 40px; 
//         background: linear-gradient(135deg, #111827, #1f2937);
//         border-radius: 50%; 
//         border: 3px solid #6b7280;
//         display: flex; 
//         align-items: center; 
//         justify-content: center;
//         box-shadow: 0 4px 16px rgba(17, 24, 39, 0.4);
//         transition: all 0.3s ease;
//         position: relative;
//       ">
//         <img 
//           src="/devv/${fileName}.webp" 
//           alt="${property.developerName}"
//           style="width: 24px; height: 24px; object-fit: contain; filter: brightness(1.2) contrast(1.1);"
//           onerror="this.style.display='none'"
//         />
//         <div style="
//           position: absolute;
//           top: -4px;
//           right: -4px;
//           background: linear-gradient(135deg, #f97316, #ea580c);
//           color: white;
//           border-radius: 50%;
//           width: 12px;
//           height: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 6px;
//           font-weight: bold;
//           border: 1px solid white;
//           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
//         ">★</div>
//       </div>
//     `,
//         iconSize: [40, 40],
//         iconAnchor: [20, 40],
//         popupAnchor: [0, -40],
//     });
// };

// export default function AreaMap({ areas, featuredProperties, height = "600px" }: Props) {
export default function AreaMap({ areas, height = "600px" }: Props) {

    const [isClient, setIsClient] = useState(false);
    // const [viewMode, setViewMode] = useState<'areas' | 'featured'>('areas');

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <div style={{ height, width: "100%" }} className="bg-gray-100 rounded-xl flex items-center justify-center">
                <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600 font-medium">Loading map...</p>
                </div>
            </div>
        );
    }

    if (!areas || areas.length === 0) {
        return (
            <div style={{ height, width: "100%" }} className="bg-gray-100 rounded-xl flex items-center justify-center">
                <p className="text-gray-500 font-medium">No areas available for map display</p>
            </div>
        );
    }

    // Calculate center point from all areas
    const centerLat = areas.reduce((sum, area) => sum + area.coordinates[0], 0) / areas.length;
    const centerLng = areas.reduce((sum, area) => sum + area.coordinates[1], 0) / areas.length;

    return (
        <div className="relative">
            {/* Modern View Mode Toggle - COMMENTED OUT FOR FUTURE USE */}
            {/* <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-2">
                <div className="flex bg-gray-50 rounded-lg p-1">
                    <button
                        onClick={() => setViewMode('areas')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${viewMode === 'areas'
                            ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-md'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                            }`}
                    >
                        Areas
                    </button>
                    <button
                        onClick={() => setViewMode('featured')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${viewMode === 'featured'
                            ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-md'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                            }`}
                    >
                        Featured
                    </button>
                </div>
            </div> */}

            <MapContainer
                center={[centerLat, centerLng]}
                zoom={10}
                style={{ height, width: "100%" }}
                className="rounded-xl shadow-lg"
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a>'
                    url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`}
                />

                {/* COMMENTED OUT FOR FUTURE USE - Featured Properties Display */}
                {/* {viewMode === 'areas' ? ( */}
                {/* // Area markers */}
                {/* areas */}
                {/*     .filter(area => !area.developers.some(dev => dev.name === 'Amali Properties')) */}
                {/*     .map((area) => { */}
                {/*         const customIcon = createAreaMarker(area); */}

                {/*         return ( */}
                {/*             <Marker */}
                {/*                 key={area.name} */}
                {/*                 position={area.coordinates} */}
                {/*                 icon={customIcon} */}
                {/*             > */}
                {/*                 <Popup className="modern-popup "> */}
                {/*                     <div className="p-0 max-w-sm "> */}
                {/*                         <div className="bg-black/95 text-white p-4 rounded-t-lg border-b border-gray-700/50 backdrop-blur-sm"> */}
                {/*                             <h3 className="text-xl font-bold mb-2">{area.name}</h3> */}
                {/*                             <div className="flex items-center justify-between text-base opacity-90"> */}
                {/*                                 <span className="font-semibold">{area.totalProperties} Properties</span> */}
                {/*                                 <span className="font-bold text-green-400">AED {(area.averagePrice / 1000000).toFixed(1)}M avg</span> */}
                {/*                             </div> */}
                {/*                         </div> */}

                {/*                         <div className="p-4 bg-black/90 backdrop-blur-sm"> */}
                {/*                             <h4 className="font-bold text-white mb-4 text-base">Developers</h4> */}
                {/*                             <div className="max-h-48 overflow-y-auto space-y-3 pr-2 custom-scrollbar"> */}
                {/*                                 {area.developers.map((developer) => ( */}
                {/*                                     <div key={developer.name} className="flex items-center gap-3 p-4 bg-gray-900/80 rounded-lg border border-gray-700/50 hover:bg-gray-800/90 transition-all duration-200 shadow-sm backdrop-blur-sm"> */}
                {/*                                         <div className="flex-1 min-w-0"> */}
                {/*                                             <p className="font-bold text-lg text-white truncate">{developer.name}</p> */}
                {/*                                             <div className="flex items-center justify-between text-sm text-gray-300 mt-2"> */}
                {/*                                                 <span className="font-semibold">{developer.properties} properties</span> */}
                {/*                                                 <span className="font-bold text-green-400">{developer.priceRange}</span> */}
                {/*                                             </div> */}
                {/*                                             {developer.featuredProperty && ( */}
                {/*                                                 <a */}
                {/*                                                     href={`/listings/${developer.featuredProperty.id}`} */}
                {/*                                                     className="inline-block mt-3 text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors" */}
                {/*                                                 > */}
                {/*                                                     View Featured Property → */}
                {/*                                                 </a> */}
                {/*                                             )} */}
                {/*                                         </div> */}
                {/*                                     </div> */}
                {/*                                 ))} */}
                {/*                             </div> */}
                {/*                         </div> */}
                {/*                     </div> */}
                {/*                 </Popup> */}
                {/*             </Marker> */}
                {/*         ); */}
                {/*     }) */}
                {/* ) : ( */}
                {/* // Featured property markers */}
                {/* featuredProperties.map((property) => { */}
                {/*     const customIcon = createFeaturedMarker(property); */}

                {/*     return ( */}
                {/*         <Marker */}
                {/*             key={property.id} */}
                {/*             position={[property.latitude, property.longitude]} */}
                {/*             icon={customIcon} */}
                {/*         > */}
                {/*             <Popup className="modern-popup"> */}
                {/*                 <div className="p-0 max-w-xs"> */}
                {/*                     <div className="bg-black/95 text-white p-4 rounded-t-lg border-b border-gray-700/50 backdrop-blur-sm"> */}
                {/*                         <div className="mb-2"> */}
                {/*                             <span className="font-bold text-lg">{property.developerName}</span> */}
                {/*                         </div> */}
                {/*                     </div> */}

                {/*                     <div className="p-4 bg-black/90 backdrop-blur-sm"> */}
                {/*                         <h3 className="font-bold text-white text-base mb-2 line-clamp-2">{property.title}</h3> */}
                {/*                         <p className="text-gray-300 text-sm mb-3">{property.location}</p> */}

                {/*                         <div className="space-y-2 mb-4"> */}
                {/*                             <div className="flex justify-between text-sm"> */}
                {/*                                 <span className="text-gray-400">Type:</span> */}
                {/*                                 <span className="font-semibold text-white">{property.type}</span> */}
                {/*                             </div> */}
                {/*                             <div className="flex justify-between text-sm"> */}
                {/*                                 <span className="text-gray-400">Price:</span> */}
                {/*                                 <span className="font-bold text-green-400">AED {(property.price / 1000000).toFixed(1)}M</span> */}
                {/*                             </div> */}
                {/*                         </div> */}

                {/*                         <a */}
                {/*                             href={`/listings/${property.id}`} */}
                {/*                             className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-sm" */}
                {/*                         > */}
                {/*                             View Details */}
                {/*                         </a> */}
                {/*                     </div> */}
                {/*                 </div> */}
                {/*             </Popup> */}
                {/*         </Marker> */}
                {/*     ); */}
                {/* }) */}
                {/* )} */}

                {/* Area markers - Currently Active */}
                {areas
                    .filter(area => !area.developers.some(dev => dev.name === 'Amali Properties'))
                    .map((area) => {
                        const customIcon = createAreaMarker(area);

                        return (
                            <Marker
                                key={area.name}
                                position={area.coordinates}
                                icon={customIcon}
                            >
                                <Popup className="modern-popup ">
                                    <div className="p-0 max-w-sm ">
                                        <div className="bg-black/95 text-white p-4 rounded-t-lg border-b border-gray-700/50 backdrop-blur-sm">
                                            <h3 className="text-xl font-bold mb-2">{area.name}</h3>
                                            <div className="flex items-center justify-between text-base opacity-90">
                                                <span className="font-semibold">{area.totalProperties} Properties</span>
                                                <span className="font-bold text-green-400">AED {(area.averagePrice / 1000000).toFixed(1)}M avg</span>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-black/90 backdrop-blur-sm">
                                            <h4 className="font-bold text-white mb-4 text-base">Developers</h4>
                                            <div className="max-h-48 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                                                {area.developers.map((developer) => (
                                                    <div key={developer.name} className="flex items-center gap-3 p-4 bg-gray-900/80 rounded-lg border border-gray-700/50 hover:bg-gray-800/90 transition-all duration-200 shadow-sm backdrop-blur-sm">
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-bold text-lg text-white truncate">{developer.name}</p>
                                                            <div className="flex items-center justify-between text-sm text-gray-300 mt-2">
                                                                <span className="font-semibold">{developer.properties} properties</span>
                                                                <span className="font-bold text-green-400">{developer.priceRange}</span>
                                                            </div>
                                                            {developer.featuredProperty && (
                                                                <a
                                                                    href={`/listings/${developer.featuredProperty.id}`}
                                                                    className="inline-block mt-3 text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                                                                >
                                                                    View Featured Property →
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
            </MapContainer>

            <style jsx>{`
                .modern-popup .leaflet-popup-content-wrapper {
                    border-radius: 16px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(55, 65, 81, 0.3);
                    overflow: hidden;
                    backdrop-filter: blur(20px);
                    background: rgba(255, 255, 255, 0.1);
                }
                
                .modern-popup .leaflet-popup-content {
                    margin: 0;
                    border-radius: 16px;
                }
                
                .modern-popup .leaflet-popup-tip {
                    background: linear-gradient(135deg, rgba(31, 41, 55, 0.9), rgba(55, 65, 81, 0.9));
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(55, 65, 81, 0.3);
                    backdrop-filter: blur(20px);
                }
                
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(229, 231, 235, 0.5);
                    border-radius: 2px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(107, 114, 128, 0.7);
                    border-radius: 2px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(75, 85, 99, 0.9);
                }
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                

            `}</style>
        </div>
    );
} 