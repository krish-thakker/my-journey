import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const FitBounds = ({ logs }) => {
    const map = useMap();

    useEffect(() => {
        if (logs.length === 0){
            return;
        }

        const bounds = logs.map(log => [
            parseFloat(log.latitude),
            parseFloat(log.longitude)
        ]);

        map.fitBounds(bounds, { padding: [50, 50] });
    }, [logs, map])

    return null;
}

export default FitBounds;