// MapView.tsx
import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { places, Place } from "./data";

export default function MapView() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <MapContainer
          center={[42.4304, 18.7712]}
          zoom={8}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {places.map((place) => (
            <Marker
              key={place.name}
              position={[place.lat, place.lng]}
              eventHandlers={{
                click: () => setSelectedPlace(place)
              }}
            />
          ))}
        </MapContainer>
      </div>
      <div style={{ width: "300px", padding: "1rem", overflowY: "auto", borderLeft: "1px solid #ccc" }}>
        {selectedPlace ? (
          <>
            <h2>{selectedPlace.name}</h2>
            {selectedPlace.images.length > 0 ? (
              selectedPlace.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`image-${index}`}
                  style={{ width: "100%", marginBottom: "10px", borderRadius: "8px" }}
                />
              ))
            ) : (
              <p>אין תמונות זמינות</p>
            )}
          </>
        ) : (
          <p>בחרי מקום כדי לראות תמונות</p>
        )}
      </div>
    </div>
  );
}

