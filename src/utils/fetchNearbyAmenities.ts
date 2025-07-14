// utils/fetchNearbyAmenities.ts

export interface Amenity {
  name: string;
  category: string;
  distance: number;
  lat: number;
  lon: number;
}

export const fetchNearbyAmenities = async (
  lat: number,
  lng: number
): Promise<Amenity[]> => {
  const radius = 3000; // meters

  // Overpass QL query: find amenities within radius
//   const query = `
//     [out:json];
//     (
//       node["amenity"](around:${radius},${lat},${lng});
//       way["amenity"](around:${radius},${lat},${lng});
//       relation["amenity"](around:${radius},${lat},${lng});
//     );
//     out center;
//   `;

const query = `
  [out:json];
  (
    node["amenity"~"hospital|school|restaurant"](around:${radius},${lat},${lng});
    way["amenity"~"hospital|school|restaurant"](around:${radius},${lat},${lng});
    relation["amenity"~"hospital|school|restaurant"](around:${radius},${lat},${lng});
  );
  out center;
`;


  const url = "https://overpass-api.de/api/interpreter";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ data: query }).toString(),
    });

    if (!res.ok) throw new Error("Failed to fetch amenities");

    const data = await res.json();

    interface OverpassElement {
      type: string;
      id: number;
      lat?: number;
      lon?: number;
      center?: {
        lat: number;
        lon: number;
      };
        tags?: {
        name?: string;
        amenity?: string;
        [key: string]: unknown;
        };
    }

    interface OverpassResponse {
  elements: OverpassElement[];
  version?: number;
  generator?: string;
  osm3s?: Record<string, string>; // or define proper type if needed
}


    const results: Amenity[] = (data as OverpassResponse).elements
      .filter((el: OverpassElement) => el.tags?.name)
      .map((el: OverpassElement) => {
        const aLat = el.lat ?? el.center?.lat;
        const aLon = el.lon ?? el.center?.lon;

        const d = haversineDistance(lat, lng, aLat!, aLon!);
        return {
        
          name: el.tags!.name!,
          category: el.tags!.amenity || "Unknown",
          distance: d,
          lat: aLat!,
          lon: aLon!,
        };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 6); // Top 10 closest

    return results;
  } catch (error) {
    console.error("Overpass API Error:", error);
    return [];
  }
};

// Haversine formula to calculate distance between two lat/lng points
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // meters
  const φ1 = lat1 * (Math.PI / 180);
  const φ2 = lat2 * (Math.PI / 180);
  const Δφ = (lat2 - lat1) * (Math.PI / 180);
  const Δλ = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in meters
}
