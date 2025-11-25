import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Leaflet with webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MarkerData {
    latitude: number;
    longitude: number;
    title: string;
    rating: number;
    maxRating?: number;
}

interface MapProps {
    latitude?: number;
    longitude?: number;
    height?: string;
    className?: string;
    title?: string;
    rating?: number;
    maxRating?: number;
    markers?: MarkerData[];
}

const Map: React.FC<MapProps> = ({
    latitude = 31.6295, // Default to Marrakech coordinates
    longitude = -7.9811,
    height = '480px',
    className = '',
    title = 'Location',
    rating = 3,
    maxRating = 5,
    markers = []
}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);
    const markersRef = useRef<L.Marker[]>([]);

    useEffect(() => {
        if (!mapRef.current) return;

        // Initialize map only if not already initialized
        if (!mapInstanceRef.current) {
            const map = L.map(mapRef.current, {
                center: [latitude, longitude],
                zoom: 13,
                zoomControl: true,
                scrollWheelZoom: true,
            });

            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19,
            }).addTo(map);

            // Create custom badge marker
            const createCustomMarker = (markerTitle: string, markerRating: number, markerMaxRating: number = 5) => {
                const markerHtml = `
                    <div style="
                        background: white;
                        border-radius: 8px;
                        padding: 6px 12px;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        white-space: nowrap;
                    ">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.5C12.2337 2.5 12.5 2.62453 12.9072 3.15625C13.3146 3.68829 13.7687 4.50113 14.4102 5.65137L14.7383 6.23926C15.0765 6.84625 15.3096 7.28495 15.6924 7.57617C16.0789 7.87022 16.5583 7.96802 17.2148 8.11621V8.11523L17.8506 8.25977C19.0974 8.54207 19.974 8.74223 20.5811 8.98145C21.1041 9.18763 21.3286 9.38504 21.4297 9.60254L21.4658 9.69629C21.5467 9.95655 21.5016 10.2757 21.1465 10.8398C20.7881 11.4091 20.1896 12.112 19.3408 13.1045L18.9062 13.6123C18.5139 14.0714 18.2153 14.4092 18.0498 14.7979L17.9863 14.9688C17.8426 15.4323 17.8998 15.9236 17.9678 16.625V16.626L18.0332 17.3027C18.1612 18.6269 18.2511 19.5653 18.2207 20.248C18.1903 20.9301 18.0441 21.2087 17.8428 21.3613C17.6495 21.5079 17.3682 21.568 16.749 21.3906C16.1234 21.2114 15.3015 20.8341 14.1348 20.2969H14.1338L13.5361 20.0225C12.9239 19.7397 12.4819 19.5254 12 19.5254C11.6383 19.5254 11.2992 19.6463 10.8936 19.8262L10.4639 20.0225L9.86719 20.2969C8.69991 20.8341 7.87776 21.2112 7.25195 21.3906C6.63224 21.5683 6.35087 21.5084 6.1582 21.3623C5.95637 21.209 5.80977 20.9296 5.7793 20.248C5.7488 19.5653 5.83879 18.6269 5.9668 17.3027L6.0332 16.627V16.626C6.09264 16.0118 6.14333 15.558 6.05762 15.1436L6.0127 14.9678C5.86866 14.5022 5.54202 14.1357 5.09473 13.6133L4.66016 13.1055V13.1045C3.81121 12.1123 3.2119 11.4101 2.85352 10.8408C2.4985 10.2768 2.45418 9.95723 2.53516 9.69629C2.61431 9.44122 2.82093 9.21616 3.41895 8.98047C4.02625 8.74111 4.90352 8.54158 6.15039 8.25977L6.78711 8.11523L6.78613 8.11426C7.44245 7.96591 7.92049 7.86962 8.30762 7.57617C8.69196 7.28467 8.92408 6.84513 9.26172 6.23926L9.58984 5.65137C10.2314 4.50085 10.6863 3.68832 11.0938 3.15625C11.5008 2.62471 11.7663 2.50008 12 2.5Z" fill="#3B82F6" stroke="#3B82F6"/>
                        </svg>

                        <span style="color: #1e293b; font-size: 14px; font-weight: 500;">${markerTitle}</span>
                        <span style="color: #0EA5E9; font-size: 14px; font-weight: 500;">${markerRating}/${markerMaxRating}</span>
                    </div>
                `;

                return L.divIcon({
                    html: markerHtml,
                    className: 'custom-marker',
                    iconSize: [200, 40],
                    iconAnchor: [100, 40],
                    popupAnchor: [0, -40]
                });
            };

            // Calculate center if markers are provided
            let mapCenter: [number, number] = [latitude, longitude];
            if (markers.length > 0) {
                const avgLat = markers.reduce((sum, m) => sum + m.latitude, 0) / markers.length;
                const avgLng = markers.reduce((sum, m) => sum + m.longitude, 0) / markers.length;
                mapCenter = [avgLat, avgLng];
            }

            // Add markers
            if (markers.length > 0) {
                // Clear existing markers safely
                markersRef.current.forEach(marker => {
                    if (marker && map.hasLayer(marker)) {
                        marker.remove();
                    }
                });
                markersRef.current = [];

                // Add all markers
                markers.forEach(markerData => {
                    const marker = L.marker([markerData.latitude, markerData.longitude], {
                        icon: createCustomMarker(markerData.title, markerData.rating, markerData.maxRating || maxRating)
                    })
                        .addTo(map)
                        .bindPopup(markerData.title);
                    markersRef.current.push(marker);
                });
            } else {
                // Add single custom marker (backward compatibility)
                const marker = L.marker([latitude, longitude], {
                    icon: createCustomMarker(title, rating, maxRating)
                })
                    .addTo(map)
                    .bindPopup(title)
                    .openPopup();
                markerRef.current = marker;
            }

            // Set map center
            map.setView(mapCenter, markers.length > 0 ? 12 : 13);
            mapInstanceRef.current = map;
        } else {
            // Update markers if they changed
            if (markers.length > 0) {
                // Clear existing markers safely
                markersRef.current.forEach(marker => {
                    if (marker && mapInstanceRef.current && mapInstanceRef.current.hasLayer(marker)) {
                        marker.remove();
                    }
                });
                markersRef.current = [];

                // Calculate new center
                const avgLat = markers.reduce((sum, m) => sum + m.latitude, 0) / markers.length;
                const avgLng = markers.reduce((sum, m) => sum + m.longitude, 0) / markers.length;
                mapInstanceRef.current.setView([avgLat, avgLng], 12);

                // Add all markers
                const currentMap = mapInstanceRef.current;
                if (currentMap) {
                    markers.forEach(markerData => {
                        const markerHtml = `
                            <div style="
                                background: white;
                                border-radius: 8px;
                                padding: 6px 12px;
                                display: flex;
                                align-items: center;
                                gap: 8px;
                                box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                                white-space: nowrap;
                            ">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.5C12.2337 2.5 12.5 2.62453 12.9072 3.15625C13.3146 3.68829 13.7687 4.50113 14.4102 5.65137L14.7383 6.23926C15.0765 6.84625 15.3096 7.28495 15.6924 7.57617C16.0789 7.87022 16.5583 7.96802 17.2148 8.11621V8.11523L17.8506 8.25977C19.0974 8.54207 19.974 8.74223 20.5811 8.98145C21.1041 9.18763 21.3286 9.38504 21.4297 9.60254L21.4658 9.69629C21.5467 9.95655 21.5016 10.2757 21.1465 10.8398C20.7881 11.4091 20.1896 12.112 19.3408 13.1045L18.9062 13.6123C18.5139 14.0714 18.2153 14.4092 18.0498 14.7979L17.9863 14.9688C17.8426 15.4323 17.8998 15.9236 17.9678 16.625V16.626L18.0332 17.3027C18.1612 18.6269 18.2511 19.5653 18.2207 20.248C18.1903 20.9301 18.0441 21.2087 17.8428 21.3613C17.6495 21.5079 17.3682 21.568 16.749 21.3906C16.1234 21.2114 15.3015 20.8341 14.1348 20.2969H14.1338L13.5361 20.0225C12.9239 19.7397 12.4819 19.5254 12 19.5254C11.6383 19.5254 11.2992 19.6463 10.8936 19.8262L10.4639 20.0225L9.86719 20.2969C8.69991 20.8341 7.87776 21.2112 7.25195 21.3906C6.63224 21.5683 6.35087 21.5084 6.1582 21.3623C5.95637 21.209 5.80977 20.9296 5.7793 20.248C5.7488 19.5653 5.83879 18.6269 5.9668 17.3027L6.0332 16.627V16.626C6.09264 16.0118 6.14333 15.558 6.05762 15.1436L6.0127 14.9678C5.86866 14.5022 5.54202 14.1357 5.09473 13.6133L4.66016 13.1055V13.1045C3.81121 12.1123 3.2119 11.4101 2.85352 10.8408C2.4985 10.2768 2.45418 9.95723 2.53516 9.69629C2.61431 9.44122 2.82093 9.21616 3.41895 8.98047C4.02625 8.74111 4.90352 8.54158 6.15039 8.25977L6.78711 8.11523L6.78613 8.11426C7.44245 7.96591 7.92049 7.86962 8.30762 7.57617C8.69196 7.28467 8.92408 6.84513 9.26172 6.23926L9.58984 5.65137C10.2314 4.50085 10.6863 3.68832 11.0938 3.15625C11.5008 2.62471 11.7663 2.50008 12 2.5Z" fill="#3B82F6" stroke="#3B82F6"/>
                                </svg>
                                <span style="color: #1e293b; font-size: 14px; font-weight: 500;">${markerData.title}</span>
                                <span style="color: #0EA5E9; font-size: 14px; font-weight: 500;">${markerData.rating}/${markerData.maxRating || maxRating}</span>
                            </div>
                        `;
                        const marker = L.marker([markerData.latitude, markerData.longitude], {
                            icon: L.divIcon({
                                html: markerHtml,
                                className: 'custom-marker',
                                iconSize: [200, 40],
                                iconAnchor: [100, 40],
                                popupAnchor: [0, -40]
                            })
                        })
                            .addTo(currentMap)
                            .bindPopup(markerData.title);
                        markersRef.current.push(marker);
                    });
                }
            } else {
                // Update map center if coordinates change
                mapInstanceRef.current.setView([latitude, longitude], 13);

                // Update marker position and content if it exists
                if (markerRef.current) {
                    markerRef.current.setLatLng([latitude, longitude]);
                    const markerHtml = `
                        <div style="
                            background: white;
                            border-radius: 8px;
                            padding: 6px 12px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            white-space: nowrap;
                        ">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2.5C12.2337 2.5 12.5 2.62453 12.9072 3.15625C13.3146 3.68829 13.7687 4.50113 14.4102 5.65137L14.7383 6.23926C15.0765 6.84625 15.3096 7.28495 15.6924 7.57617C16.0789 7.87022 16.5583 7.96802 17.2148 8.11621V8.11523L17.8506 8.25977C19.0974 8.54207 19.974 8.74223 20.5811 8.98145C21.1041 9.18763 21.3286 9.38504 21.4297 9.60254L21.4658 9.69629C21.5467 9.95655 21.5016 10.2757 21.1465 10.8398C20.7881 11.4091 20.1896 12.112 19.3408 13.1045L18.9062 13.6123C18.5139 14.0714 18.2153 14.4092 18.0498 14.7979L17.9863 14.9688C17.8426 15.4323 17.8998 15.9236 17.9678 16.625V16.626L18.0332 17.3027C18.1612 18.6269 18.2511 19.5653 18.2207 20.248C18.1903 20.9301 18.0441 21.2087 17.8428 21.3613C17.6495 21.5079 17.3682 21.568 16.749 21.3906C16.1234 21.2114 15.3015 20.8341 14.1348 20.2969H14.1338L13.5361 20.0225C12.9239 19.7397 12.4819 19.5254 12 19.5254C11.6383 19.5254 11.2992 19.6463 10.8936 19.8262L10.4639 20.0225L9.86719 20.2969C8.69991 20.8341 7.87776 21.2112 7.25195 21.3906C6.63224 21.5683 6.35087 21.5084 6.1582 21.3623C5.95637 21.209 5.80977 20.9296 5.7793 20.248C5.7488 19.5653 5.83879 18.6269 5.9668 17.3027L6.0332 16.627V16.626C6.09264 16.0118 6.14333 15.558 6.05762 15.1436L6.0127 14.9678C5.86866 14.5022 5.54202 14.1357 5.09473 13.6133L4.66016 13.1055V13.1045C3.81121 12.1123 3.2119 11.4101 2.85352 10.8408C2.4985 10.2768 2.45418 9.95723 2.53516 9.69629C2.61431 9.44122 2.82093 9.21616 3.41895 8.98047C4.02625 8.74111 4.90352 8.54158 6.15039 8.25977L6.78711 8.11523L6.78613 8.11426C7.44245 7.96591 7.92049 7.86962 8.30762 7.57617C8.69196 7.28467 8.92408 6.84513 9.26172 6.23926L9.58984 5.65137C10.2314 4.50085 10.6863 3.68832 11.0938 3.15625C11.5008 2.62471 11.7663 2.50008 12 2.5Z" fill="#3B82F6" stroke="#3B82F6"/>
                            </svg>
                            <span style="color: #1e293b; font-size: 14px; font-weight: 500;">${title}</span>
                            <span style="color: #0EA5E9; font-size: 14px; font-weight: 500;">${rating}/${maxRating}</span>
                        </div>
                    `;
                    markerRef.current.setIcon(L.divIcon({
                        html: markerHtml,
                        className: 'custom-marker',
                        iconSize: [200, 40],
                        iconAnchor: [100, 40],
                        popupAnchor: [0, -40]
                    }));
                }
            }
        }

        // Cleanup
        return () => {
            // Safely remove all markers
            markersRef.current.forEach(marker => {
                try {
                    if (marker && mapInstanceRef.current && mapInstanceRef.current.hasLayer(marker)) {
                        marker.remove();
                    }
                } catch (e) {
                    // Ignore errors during cleanup
                }
            });
            markersRef.current = [];
            
            // Safely remove single marker
            if (markerRef.current) {
                try {
                    if (mapInstanceRef.current && mapInstanceRef.current.hasLayer(markerRef.current)) {
                        markerRef.current.remove();
                    }
                } catch (e) {
                    // Ignore errors during cleanup
                }
                markerRef.current = null;
            }
            
            // Remove map instance
            if (mapInstanceRef.current) {
                try {
                    mapInstanceRef.current.remove();
                } catch (e) {
                    // Ignore errors during cleanup
                }
                mapInstanceRef.current = null;
            }
        };
    }, [latitude, longitude, title, rating, maxRating, markers]);

    return (
        <div
            ref={mapRef}
            className={`w-full rounded-[12px] overflow-hidden relative z-0 ${className}`}
            style={{ height, zIndex: 0 }}
        />
    );
};

export default Map;

