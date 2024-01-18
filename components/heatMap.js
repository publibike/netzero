"use client";
// components/GoogleMap.js

import React from 'react';
import { GoogleMap, HeatmapLayer, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 40.4168,
  lng: -3.7038,
};

const libraries = ["visualization"];

const heatmapData = [
    { location: { lat: 40.4168, lng: -3.7038 }, weight: 10 },
    { location: { lat: 40.4175, lng: -3.7058 }, weight: 5 },
    { location: { lat: 40.4158, lng: -3.7023 }, weight: 8 },
    { location: { lat: 40.4168, lng: -3.7038 }, weight: 10 },
    // Add more data points as needed
  ];

const GoogleMapComponent = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCufQ68Dqw6V6yfMJLzSEnjalBnhyKLeLQ" libraries={libraries}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        <HeatmapLayer data={heatmapData} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
