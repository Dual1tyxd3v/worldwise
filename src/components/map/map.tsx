import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './map.module.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';

import { LatLngExpression } from 'leaflet';
import { useOwnContext } from '../../contexts/cities-context';
import { APP_ROUTE } from '../../const';
import { useGeolocation } from '../../hooks/useGeolocation';
import Button from '../button/button';
import { useUrlPosition } from '../../hooks/useUrlPosition';

export default function Map() {
  const [position, setPosition] = useState<LatLngExpression>([40, 0]);
  const { cities } = useOwnContext();
  const {
    isLoading: isLoadingPos,
    getPosition,
    position: geoPosition,
  } = useGeolocation();
  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    if (lat && lng) setPosition([+lat, +lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoPosition) setPosition(geoPosition as LatLngExpression);
  }, [geoPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoPosition && <Button type="position" onClick={getPosition}>
        {isLoadingPos ? 'Loading' : 'Use your position'}
      </Button>}
      <MapContainer
        className={styles.map}
        center={position}
        zoom={6}
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
              })
            }
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangePosition position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

type ChangePositionProps = {
  position: LatLngExpression;
};

function ChangePosition({ position }: ChangePositionProps) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      const query = `?lat=${e.latlng.lat}&lng=${e.latlng.lng}`;
      navigate(`${APP_ROUTE.FORM}${query}`);
    },
  });
  return null;
}
