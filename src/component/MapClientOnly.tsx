"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Use direct string paths instead of importing the image
L.Icon.Default.mergeOptions({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Props {
  lat: number;
  lng: number;
  title: string;
  location: string;
  height?: string; // optional height

}

export default function MapClientOnly({ lat, lng, title, location, height = "300px" }: Props) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{ height , width: "100%" }}
      className="rounded mb-4"
      scrollWheelZoom={false}
    >
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
     <TileLayer
        attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a>'
      url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`}
      />


      <Marker position={[lat, lng]}>
        <Popup>
          {title}
          <br />
          {location}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
