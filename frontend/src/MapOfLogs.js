import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import FitBounds from './FitBounds';
import './MapOfLogs.css';

// Ensure default marker is properly referenced
delete L.Icon.Default.prototype._getIconUrl; 
L.Icon.Default.mergeOptions({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapOfLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/logs')
            .then(response => response.json())
            .then(data => setLogs(data))
            .catch(error => console.error('Error fetching logs', error));
    }, []);

    return (
        <div className="map-wrapper">
            <div className="map-container">
                <MapContainer style={{ height: "100%", width: "100%" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    {logs.map(log => {
                        console.log(log.image_url); // Debug: Check the URL
                        return log.latitude && log.longitude && (
                            <Marker key={log.id} position={[parseFloat(log.latitude), parseFloat(log.longitude)]}>
                                <Popup>
                                    <div>
                                        <strong>{log.place_name}</strong><br />
                                        {log.description}
                                        {log.image_url && (
                                            <div style={{ marginTop: '10px' }}>
                                                <img
                                                    src={log.image_url}
                                                    alt={log.place_name}
                                                    style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                    <FitBounds logs={logs} />
                </MapContainer>
            </div>
        </div>
    );
};

export default MapOfLogs;