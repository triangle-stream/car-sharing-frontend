import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapView = () => {
  const [stops, setStops] = useState([]);
  const [route, setRoute] = useState([]);

  useEffect(() => {
    // Recupera le fermate dal backend
    const fetchStops = async () => {
      const response = await axios.get("http://localhost:5003/api/stops");
      setStops(response.data);
    };
    fetchStops();
  }, []);

  const calculateRoute = async (start, end) => {
    const API_KEY = process.env.REACT_APP_ROUTING_API; // Inserisci la chiave API qui
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`;
    const response = await axios.get(url);
    const coordinates = response.data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
    setRoute(coordinates);
  };

  return (
    <div>
      <MapContainer center={[40.8518, 14.2681]} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {stops.map((stop) => (
          <Marker
            key={stop._id}
            position={[stop.location.lat, stop.location.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () => console.log(`Selected stop: ${stop.name}`),
            }}
          >
            <Popup>{stop.name}</Popup>
          </Marker>
        ))}
        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
      <button onClick={() => calculateRoute(stops[0].location, stops[1].location)}>Calcola Percorso</button>
    </div>
  );
};

export default MapView;
