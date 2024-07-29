import React, { useEffect, useRef } from 'react';
const GoogleMap = ({ latitude, longitude }) => {
  const mapRef = useRef(null);
  useEffect(() => {
    if (latitude && longitude) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
      });
      new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
      });
    }
  }, [latitude, longitude]);
  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};
export default GoogleMap;