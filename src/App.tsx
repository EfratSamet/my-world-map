import { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { places, Place } from './data';
import { ImagePopup } from './components/ImagePopup';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// תקן האייקון של leaflet שלא יישבר
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

function App() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      {/* מפה */}
      <MapContainer center={[42.5, 19.3]} zoom={8} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {places.map((place, idx) => (
          <Marker
            key={idx}
            position={[place.lat, place.lng]}
            eventHandlers={{
              click: () => {
                setSelectedPlace(place);
              }
            }}
          />
        ))}
      </MapContainer>

      {/* חלונית צד לתמונות */}
      {selectedPlace && (
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          width: '350px',
          backgroundColor: '#ffffffdd',
          padding: '1rem',
          overflowY: 'auto',
          boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
          <h2>{selectedPlace.name}</h2>
          <ImagePopup name={selectedPlace.name} images={selectedPlace.images} />
        </div>
      )}
    </div>
  );
}

export default App;
