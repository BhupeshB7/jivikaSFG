import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Check if geolocation is available in the user's browser
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAgiD-aiBarXHFq7gvmcPxiIyUs_FD0X90">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation || { lat: 0, lng: 0 }}
        zoom={15}
      >
        {currentLocation && <Marker position={currentLocation} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
