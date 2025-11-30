import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapPopupCard from '../MapPopupCard';

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
    id: number;
    latitude: number;
    longitude: number;
    title: string;
    rating: number;
    distance: number;
    images: string[];
    type: 'hotel' | 'service' | 'experience' | 'health';
    // For hotels
    nbLit?: number;
    nbChambre?: number;
    nbNuit?: number;
    totalPrice?: number;
    pricePerNight?: number;
    // For services/restaurants
    genre?: string[];
    minimumPrice?: number;
    maximumPrice?: number;
    status?: 'Ouvert' | 'Fermé';
    nbRating?: number;
    // For experiences
    price?: number;
    nbPeople?: number;
    // For health
    jourDebut?: string;
    jourFin?: string;
    heureDebut?: string;
    heureFin?: string;
    // Callback
    onCardClick?: () => void;
}

interface MapProps {
    latitude?: number;
    longitude?: number;
    height?: string;
    className?: string;
    title?: string;
    rating?: number;
    maxRating?: number;
    pricePerNight?: number;
    markers?: MarkerData[];
    isDetailsPage?: boolean; // Flag to indicate Details page mode
}

const Map: React.FC<MapProps> = ({
    latitude = 31.6295, // Default to Marrakech coordinates
    longitude = -7.9811,
    height = '480px',
    className = '',
    title = 'Location',
    rating = 3,
    maxRating = 5,
    pricePerNight,
    markers = [],
    isDetailsPage = false
}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);
    const markersRef = useRef<L.Marker[]>([]);
    const isVisibleRef = useRef(true);

    useEffect(() => {
        if (!mapRef.current) return;

        // Check if container is ready and visible
        const isContainerReady = (container: HTMLDivElement): boolean => {
            if (!container.isConnected) return false;
            const rect = container.getBoundingClientRect();
            const style = window.getComputedStyle(container);
            return rect.width > 0 && 
                   rect.height > 0 && 
                   container.offsetWidth > 0 &&
                   container.offsetHeight > 0 &&
                   style.display !== 'none' && 
                   style.visibility !== 'hidden' &&
                   style.opacity !== '0';
        };

        // Create custom badge marker - displays only price
        const createCustomMarker = (price: number) => {
            // Format number with space separators (e.g., 1000 -> "1 000")
            const formatNumber = (num: number): string => {
                return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
            };
            const priceText = `${formatNumber(price)}MAD`;
            const markerHtml = `
                <div style="
                    background: white;
                    border-radius: 9999px;
                    padding: 8px 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    white-space: nowrap;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                ">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${priceText}</span>
                </div>
            `;

            return L.divIcon({
                html: markerHtml,
                className: 'custom-marker',
                iconSize: [80, 36],
                iconAnchor: [40, 36],
                popupAnchor: [0, -36]
            });
        };

        // Create custom marker for Details page - displays title
        const createDetailsMarker = (markerTitle: string) => {
            // Truncate title if too long
            const maxLength = 30;
            const displayTitle = markerTitle.length > maxLength 
                ? markerTitle.substring(0, maxLength) + '...' 
                : markerTitle;
            
            // Calculate width with proper padding (16px left + 16px right = 32px total)
            const textWidth = displayTitle.length * 8; // Approximate character width
            const paddingX = 32; // 16px on each side
            const totalWidth = Math.min(textWidth + paddingX, 250);
            
            const markerHtml = `
                <div style="
                    background: white;
                    border-radius: 9999px;
                    padding: 8px 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    white-space: nowrap;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    cursor: pointer;
                    min-width: ${totalWidth}px;
                    box-sizing: border-box;
                ">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600; padding: 0;">${displayTitle}</span>
                </div>
            `;

            return L.divIcon({
                html: markerHtml,
                className: 'custom-marker details-marker',
                iconSize: [totalWidth, 36],
                iconAnchor: [totalWidth / 2, 36],
                popupAnchor: [0, -36]
            });
        };

        // Initialize map only if not already initialized
        // Defer initialization to avoid blocking scroll
        if (!mapInstanceRef.current) {
            const container = mapRef.current;
            if (!isContainerReady(container)) {
                // Retry initialization when container is ready
                const retryInit = () => {
                    if (mapRef.current && isContainerReady(mapRef.current) && !mapInstanceRef.current) {
                        // Will be initialized by the effect
                    } else if (mapRef.current && !isContainerReady(mapRef.current)) {
                        setTimeout(retryInit, 100);
                    }
                };
                setTimeout(retryInit, 100);
                return;
            }

            // Defer map initialization to avoid blocking scroll
            const initMap = () => {
                if (!mapRef.current || mapInstanceRef.current) return;
                
                try {
                    const map = L.map(container, {
                        center: [latitude, longitude],
                        zoom: 13,
                        zoomControl: true,
                        scrollWheelZoom: true,
                        preferCanvas: true, // Use canvas renderer for better performance
                    });

                // Add OpenStreetMap tiles with performance optimizations
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors',
                    maxZoom: 19,
                    updateWhenIdle: true, // Only update when idle
                    updateWhenZooming: false, // Don't update during zoom
                    keepBuffer: 2, // Keep buffer for smoother panning
                }).addTo(map);

                // Add error handlers to prevent _leaflet_pos errors
                map.on('zoomend', () => {
                    if (!isVisibleRef.current || !mapRef.current || !isContainerReady(mapRef.current)) {
                        return;
                    }
                    try {
                        if (mapInstanceRef.current && mapRef.current) {
                            const container = mapRef.current;
                            if (container.isConnected && container.offsetWidth > 0 && container.offsetHeight > 0) {
                                mapInstanceRef.current.invalidateSize();
                            }
                        }
                    } catch (e) {
                        // Ignore errors when map is not visible
                    }
                });

                // Prevent zoom transitions when map is not visible
                map.on('zoomstart', () => {
                    if (!isVisibleRef.current || !mapRef.current || !isContainerReady(mapRef.current)) {
                        // Cancel zoom if map is not visible
                        try {
                            map.stop();
                        } catch (e) {
                            // Ignore
                        }
                    }
                });

                // Handle zoom transition end with extra safety
                const originalOnZoomTransitionEnd = (map as any)._onZoomTransitionEnd;
                if (originalOnZoomTransitionEnd) {
                    (map as any)._onZoomTransitionEnd = function() {
                        if (!isVisibleRef.current || !mapRef.current) {
                            return;
                        }
                        const container = mapRef.current;
                        if (!container.isConnected || container.offsetWidth === 0 || container.offsetHeight === 0) {
                            return;
                        }
                        try {
                            // Check if map pane exists and is connected
                            const mapPane = (this as any)._panes?.mapPane;
                            if (!mapPane || !mapPane.parentNode || !mapPane.parentNode.isConnected) {
                                return;
                            }
                            return originalOnZoomTransitionEnd.call(this);
                        } catch (e) {
                            // Silently ignore errors during zoom transitions when not visible
                            return;
                        }
                    };
                }

                // Disable zoom animations when map is not visible to prevent transition errors
                const originalSetZoom = map.setZoom.bind(map);
                map.setZoom = function(zoom: number, options?: L.ZoomPanOptions) {
                    if (!isVisibleRef.current || !mapRef.current) {
                        return this;
                    }
                    const container = mapRef.current;
                    if (!container.isConnected || container.offsetWidth === 0 || container.offsetHeight === 0) {
                        return this;
                    }
                    try {
                        // Disable animation if not visible
                        const safeOptions = { ...options, animate: false };
                        return originalSetZoom(zoom, safeOptions);
                    } catch (e) {
                        console.warn('setZoom error:', e);
                        return this;
                    }
                };

                // Wrap map methods to check visibility
                const originalSetView = map.setView.bind(map);
                map.setView = function(center: L.LatLngExpression, zoom?: number, options?: L.ZoomPanOptions) {
                    if (!isVisibleRef.current || !mapRef.current || !isContainerReady(mapRef.current)) {
                        return this;
                    }
                    try {
                        return originalSetView(center, zoom, options);
                    } catch (e) {
                        console.warn('Map setView error:', e);
                        return this;
                    }
                };

                const originalInvalidateSize = map.invalidateSize.bind(map);
                map.invalidateSize = function(animate?: boolean) {
                    if (!isVisibleRef.current || !mapRef.current) {
                        return this;
                    }
                    const container = mapRef.current;
                    if (!container.isConnected || container.offsetWidth === 0 || container.offsetHeight === 0) {
                        return this;
                    }
                    try {
                        return originalInvalidateSize(animate);
                    } catch (e) {
                        // Ignore errors when map is not visible
                        return this;
                    }
                };

                // Override _getMapPanePos to prevent _leaflet_pos errors
                const originalGetMapPanePos = (map as any)._getMapPanePos;
                if (originalGetMapPanePos) {
                    (map as any)._getMapPanePos = function() {
                        if (!isVisibleRef.current || !mapRef.current) {
                            return L.point(0, 0);
                        }
                        const container = mapRef.current;
                        if (!container.isConnected || container.offsetWidth === 0 || container.offsetHeight === 0) {
                            return L.point(0, 0);
                        }
                        try {
                            const mapPane = (this as any)._panes?.mapPane;
                            if (!mapPane || !mapPane.parentNode) {
                                return L.point(0, 0);
                            }
                            return originalGetMapPanePos.call(this);
                        } catch (e) {
                            // Silently return default point to prevent errors
                            return L.point(0, 0);
                        }
                    };
                }

                // Override _move to prevent errors during panning when not visible
                const originalMove = (map as any)._move;
                if (originalMove) {
                    (map as any)._move = function(center: L.LatLng, zoom?: number, options?: any) {
                        if (!isVisibleRef.current || !mapRef.current) {
                            return this;
                        }
                        const container = mapRef.current;
                        if (!container.isConnected || container.offsetWidth === 0 || container.offsetHeight === 0) {
                            return this;
                        }
                        try {
                            return originalMove.call(this, center, zoom, options);
                        } catch (e) {
                            console.warn('_move error:', e);
                            return this;
                        }
                    };
                }

                // Calculate center if markers are provided
                let mapCenter: [number, number] = [latitude, longitude];
                if (markers.length > 0) {
                    const avgLat = markers.reduce((sum: number, m: MarkerData) => sum + m.latitude, 0) / markers.length;
                    const avgLng = markers.reduce((sum: number, m: MarkerData) => sum + m.longitude, 0) / markers.length;
                    mapCenter = [avgLat, avgLng];
                }

                // Add markers
                if (markers.length > 0) {
                    // Clear existing markers safely
                    markersRef.current.forEach(marker => {
                        try {
                            if (marker && map.hasLayer(marker)) {
                                marker.remove();
                            }
                        } catch (e) {
                            // Ignore
                        }
                    });
                    markersRef.current = [];

                    // Add all markers
                    markers.forEach((markerData: MarkerData) => {
                        try {
                            const price = markerData.pricePerNight || markerData.minimumPrice || markerData.price || 0;
                            if (price > 0) {
                                const marker = L.marker([markerData.latitude, markerData.longitude], {
                                    icon: createCustomMarker(price)
                                }).addTo(map);

                                // Create popup container
                                const popupContent = document.createElement('div');
                                popupContent.className = 'map-popup-card-container';
                                
                                const popup = L.popup({
                                    closeButton: false,
                                    minWidth: 320,
                                    maxWidth: 320,
                                    className: 'custom-map-popup',
                                    autoPan: true,
                                    autoPanPadding: [20, 20]
                                }).setContent(popupContent);

                                marker.bindPopup(popup);

                                // Render React component into popup
                                marker.on('popupopen', () => {
                                    const root = ReactDOM.createRoot(popupContent);
                                    root.render(
                                        <MapPopupCard
                                            id={markerData.id}
                                            type={markerData.type}
                                            title={markerData.title}
                                            images={markerData.images}
                                            rating={markerData.rating}
                                            distance={markerData.distance}
                                            nbLit={markerData.nbLit}
                                            nbChambre={markerData.nbChambre}
                                            nbNuit={markerData.nbNuit}
                                            totalPrice={markerData.totalPrice}
                                            pricePerNight={markerData.pricePerNight}
                                            genre={markerData.genre}
                                            minimumPrice={markerData.minimumPrice}
                                            maximumPrice={markerData.maximumPrice}
                                            status={markerData.status}
                                            nbRating={markerData.nbRating}
                                            price={markerData.price}
                                            nbPeople={markerData.nbPeople}
                                            jourDebut={markerData.jourDebut}
                                            jourFin={markerData.jourFin}
                                            heureDebut={markerData.heureDebut}
                                            heureFin={markerData.heureFin}
                                            onClick={markerData.onCardClick}
                                        />
                                    );
                                });

                                // Cleanup on popup close
                                marker.on('popupclose', () => {
                                    const root = (popupContent as any)._reactRoot;
                                    if (root) {
                                        root.unmount();
                                    }
                                });

                                markersRef.current.push(marker);
                            }
                        } catch (e) {
                            console.warn('Error adding marker:', e);
                        }
                    });
                } else {
                    // Add single custom marker (backward compatibility or Details page)
                    try {
                        if (isDetailsPage && title) {
                            // Details page: show title and open Google Maps on click
                            const marker = L.marker([latitude, longitude], {
                                icon: createDetailsMarker(title)
                            }).addTo(map);
                            
                            // Open Google Maps with directions on marker click
                            marker.on('click', () => {
                                const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
                                window.open(googleMapsUrl, '_blank');
                            });
                            
                            markerRef.current = marker;
                        } else {
                            // Regular marker with price
                            const price = pricePerNight || 0;
                            if (price > 0) {
                                const marker = L.marker([latitude, longitude], {
                                    icon: createCustomMarker(price)
                                })
                                    .addTo(map)
                                    .bindPopup(title)
                                    .openPopup();
                                markerRef.current = marker;
                            }
                        }
                    } catch (e) {
                        console.warn('Error adding single marker:', e);
                    }
                }

                // Set map center
                try {
                    if (isContainerReady(container)) {
                        map.setView(mapCenter, markers.length > 0 ? 12 : 13);
                    }
                } catch (e) {
                    console.warn('Error setting initial map view:', e);
                }
                
                mapInstanceRef.current = map;

                // Invalidate size after initialization
                setTimeout(() => {
                    try {
                        if (mapInstanceRef.current && mapRef.current && isContainerReady(mapRef.current)) {
                            mapInstanceRef.current.invalidateSize();
                        }
                    } catch (e) {
                        // Ignore
                    }
                }, 100);
            } catch (error) {
                console.error('Error initializing map:', error);
                mapInstanceRef.current = null;
            }
            };
            
            // Defer map initialization to avoid blocking scroll
            if (typeof requestIdleCallback !== 'undefined') {
                requestIdleCallback(initMap, { timeout: 300 });
            } else {
                // Fallback for browsers without requestIdleCallback
                requestAnimationFrame(() => {
                    setTimeout(initMap, 100);
                });
            }
        } else {
            // Update markers if they changed
            if (!mapRef.current || !isContainerReady(mapRef.current)) {
                return;
            }

            try {
                if (markers.length > 0) {
                    // Clear existing markers safely
                    markersRef.current.forEach(marker => {
                        try {
                            if (marker && mapInstanceRef.current && mapInstanceRef.current.hasLayer(marker)) {
                                marker.remove();
                            }
                        } catch (e) {
                            // Ignore
                        }
                    });
                    markersRef.current = [];

                    // Calculate new center
                    const avgLat = markers.reduce((sum: number, m: MarkerData) => sum + m.latitude, 0) / markers.length;
                    const avgLng = markers.reduce((sum: number, m: MarkerData) => sum + m.longitude, 0) / markers.length;
                    
                    if (mapInstanceRef.current && isVisibleRef.current) {
                        try {
                            mapInstanceRef.current.setView([avgLat, avgLng], 12);
                        } catch (e) {
                            console.warn('Error updating map view:', e);
                        }
                    }

                    // Add all markers
                    const currentMap = mapInstanceRef.current;
                    if (currentMap) {
                        markers.forEach((markerData: MarkerData) => {
                            try {
                                const price = markerData.pricePerNight || 0;
                                if (price > 0) {
                                    const marker = L.marker([markerData.latitude, markerData.longitude], {
                                        icon: createCustomMarker(price)
                                    })
                                        .addTo(currentMap)
                                        .bindPopup(markerData.title);
                                    markersRef.current.push(marker);
                                }
                            } catch (e) {
                                console.warn('Error adding marker:', e);
                            }
                        });
                    }
                } else {
                    // Update map center if coordinates change
                    if (mapInstanceRef.current && isVisibleRef.current) {
                        try {
                            mapInstanceRef.current.setView([latitude, longitude], 13);
                        } catch (e) {
                            console.warn('Error updating map view:', e);
                        }
                    }

                    // Update marker position and content if it exists
                    if (markerRef.current) {
                        try {
                            const price = pricePerNight || 0;
                            if (price > 0) {
                                markerRef.current.setLatLng([latitude, longitude]);
                                markerRef.current.setIcon(createCustomMarker(price));
                            }
                        } catch (e) {
                            console.warn('Error updating marker:', e);
                        }
                    }
                }
            } catch (e) {
                console.warn('Error updating map:', e);
            }
        }

        // Use Intersection Observer to track visibility with debouncing
        let visibilityTimeout: NodeJS.Timeout | null = null;
        let isProcessingVisibility = false;
        
        const observer = new IntersectionObserver(
            (entries) => {
                // Debounce visibility changes to prevent lag during scroll
                if (visibilityTimeout) {
                    clearTimeout(visibilityTimeout);
                }
                
                visibilityTimeout = setTimeout(() => {
                    if (isProcessingVisibility) return;
                    isProcessingVisibility = true;
                    
                    // Use requestIdleCallback to defer non-critical operations
                    const processVisibility = (deadline?: IdleDeadline) => {
                        entries.forEach(entry => {
                            const wasVisible = isVisibleRef.current;
                            const isIntersecting = entry.isIntersecting && entry.intersectionRatio > 0.3;
                            isVisibleRef.current = isIntersecting;
                            
                            if (mapInstanceRef.current) {
                                if (isIntersecting && !wasVisible) {
                                    // Map became visible - resume and invalidate size
                                    // Defer to next frame to avoid blocking scroll
                                    requestAnimationFrame(() => {
                                        try {
                                            const container = mapRef.current;
                                            if (container && container.isConnected && container.offsetWidth > 0 && container.offsetHeight > 0) {
                                                // Re-enable interactions
                                                if (mapInstanceRef.current?.dragging) {
                                                    mapInstanceRef.current.dragging.enable();
                                                }
                                                if (mapInstanceRef.current?.touchZoom) {
                                                    mapInstanceRef.current.touchZoom.enable();
                                                }
                                                
                                                // Defer invalidateSize to avoid blocking
                                                requestIdleCallback(() => {
                                                    try {
                                                        if (mapInstanceRef.current && mapRef.current) {
                                                            mapInstanceRef.current.invalidateSize();
                                                        }
                                                    } catch (e) {
                                                        // Ignore
                                                    }
                                                }, { timeout: 500 });
                                            }
                                        } catch (e) {
                                            // Ignore
                                        }
                                    });
                                } else if (!isIntersecting && wasVisible) {
                                    // Map became invisible - pause interactions and stop any ongoing animations
                                    requestAnimationFrame(() => {
                                        try {
                                            // Stop any ongoing zoom/pan animations
                                            if ((mapInstanceRef.current as any)?._zoomAnim) {
                                                (mapInstanceRef.current as any)._zoomAnim.stop();
                                            }
                                            
                                            // Disable interactions to prevent errors
                                            if (mapInstanceRef.current?.dragging) {
                                                mapInstanceRef.current.dragging.disable();
                                            }
                                            if (mapInstanceRef.current?.touchZoom) {
                                                mapInstanceRef.current.touchZoom.disable();
                                            }
                                        } catch (e) {
                                            // Ignore
                                        }
                                    });
                                }
                            }
                        });
                        
                        isProcessingVisibility = false;
                    };
                    
                    // Use requestIdleCallback if available, otherwise use setTimeout
                    if (typeof requestIdleCallback !== 'undefined') {
                        requestIdleCallback(processVisibility, { timeout: 100 });
                    } else {
                        setTimeout(() => processVisibility(), 50);
                    }
                }, 150); // Debounce for 150ms
            },
            { 
                threshold: [0, 0.3, 0.5, 1.0], // Multiple thresholds for smoother transitions
                rootMargin: '50px' // Start observing 50px before entering viewport
            }
        );

        if (mapRef.current) {
            observer.observe(mapRef.current);
        }

        // Cleanup
        return () => {
            if (visibilityTimeout) {
                clearTimeout(visibilityTimeout);
            }
            observer.disconnect();
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
        <>
            <style>
                {`
                    .custom-map-popup .leaflet-popup-content-wrapper {
                        background: transparent;
                        box-shadow: none;
                        padding: 0;
                        border-radius: 16px;
                        overflow: visible;
                    }
                    
                    .custom-map-popup .leaflet-popup-content {
                        margin: 0;
                        width: auto !important;
                    }
                    
                    .custom-map-popup .leaflet-popup-tip-container {
                        display: none;
                    }
                    
                    .custom-map-popup .leaflet-popup-close-button {
                        display: none;
                    }
                    
                    .map-popup-card-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                `}
            </style>
            <div
                ref={mapRef}
                className={`w-full rounded-[12px] overflow-hidden relative z-0 ${className}`}
                style={{ 
                    height, 
                    zIndex: 0,
                    willChange: 'transform', // Hint browser for better performance
                    contain: 'layout style paint' // Optimize rendering
                }}
            />
        </>
    );
};

export default Map;
