import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -34.397,
  lng: 150.644
};

function Map({ onLocationSelect }) {
  const [markers, setMarkers] = React.useState([]);

  const onMapClick = React.useCallback((e) => {
    const newMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarkers(current => [...current, newMarker]);
    onLocationSelect(newMarker);
  }, [onLocationSelect]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCyqT3WsVGDZKspRLXJ58hbXiWgM5vFOUU"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={onMapClick}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map;