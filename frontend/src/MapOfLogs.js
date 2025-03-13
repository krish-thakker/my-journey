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
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Matching Gradient Header */}
            <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
                <h2 className="text-3xl font-bold text-white text-center">Where You've Traveled!</h2>
            </div>

            {/* Map Container */}
            <div className="h-[500px] w-full relative">
                <MapContainer style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {logs.map((log) => {
                        return log.latitude && log.longitude && (
                            <Marker key={log.id} position={[parseFloat(log.latitude), parseFloat(log.longitude)]}>
                                <Popup className="rounded-lg shadow-lg">
                                    <div className="space-y-2">
                                        <strong className="text-lg font-semibold text-gray-800">{log.place_name}</strong>
                                        <p className="text-sm text-gray-600">{log.description}</p>
                                        {log.image_url && (
                                            <div className="mt-2">
                                                <img
                                                    src={log.image_url}
                                                    alt={log.place_name}
                                                    className="w-40 h-24 object-cover rounded-md"
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