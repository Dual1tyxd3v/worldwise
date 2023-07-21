import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './map.module.css';
import { APP_ROUTE } from '../../const';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon, PointExpression } from 'leaflet';

import { LatLngExpression } from 'leaflet';
import { useOwnContext } from '../../contexts/cities-context';

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [position, setPosition] = useState<LatLngExpression>([40, 0]);
  const { cities } = useOwnContext();
  const navigate = useNavigate();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={position}
        zoom={11}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={`map_marker_${city.id}`}
            position={[city.position.lat, city.position.lng]}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [22, 32],
                iconAnchor: position as PointExpression,
              })
            }
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
