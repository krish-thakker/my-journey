import { useEffect, useState } from 'react';

const DisplayLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/logs")
            .then((res) => res.json())
            .then((data) => setLogs(data));
    }, []);

    return (
        <div>
            <h2>Travel Logs</h2>
            <ul>
                {logs.map((log) => (
                    <li key = {log.id}>
                        <strong>{log.place_name}</strong> - {log.description} ({log.latitude}, {log.longitude})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisplayLogs;