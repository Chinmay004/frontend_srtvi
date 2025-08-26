"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  lat: number;
  lng: number;
  title: string;
  location: string;
  height?: string; // optional height
  developerName?: string; // optional developer name for marker styling
}

export default function MapClientOnly({ lat, lng, title, location, height = "300px", developerName }: Props) {
  // Create custom circular marker icon similar to SecondaryPropertiesMap
  const createPropertyIcon = () => {
    // Use developer name or location name for properties without developer
    const displayName = developerName || location;
    const developerNameLower = displayName.toLowerCase();

    // Generate a consistent color for each developer/location
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
    for (let i = 0; i < developerNameLower.length; i++) {
      hash = developerNameLower.charCodeAt(i) + ((hash << 5) - hash);
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
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20]
    });
  };

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{ height, width: "100%" }}
      className="rounded mb-4"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a>'
        url={`https://api.maptiler.com/maps/streets-dark/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`}
      />

      <Marker position={[lat, lng]} icon={createPropertyIcon()}>
        <Popup>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{location}</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
