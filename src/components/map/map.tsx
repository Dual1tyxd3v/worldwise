import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './map.module.css';
import { APP_ROUTE } from '../../const';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon, PointExpression } from 'leaflet';

import { LatLngExpression } from 'leaflet';

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [position, setPosition] = useState<LatLngExpression>([40, 0]);
  const navigate = useNavigate();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate(APP_ROUTE.FORM);
      }}
    >
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
        <Marker
          position={position}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [22, 32],
              iconAnchor: position as PointExpression,
            })
          }
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
