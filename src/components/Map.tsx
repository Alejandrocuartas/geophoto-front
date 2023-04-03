import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlMzFqbyIsImEiOiJja3U1eHF6c3IwMHdxMnZuejFwZmNpNzZjIn0.SneF3ILRiMT9XjP0ncOiEQ';
const photos = [
    {
        id: 1,
        longitude: -76.0833333,
        latitude: 3.9166667,
        image_url: "https://th.bing.com/th/id/OIP.NURS1fS0bKuQXYetZrnm3gAAAA?pid=ImgDet&rs=1"
    },
    {
        id: 2,
        longitude: -76.5225,
        latitude: 3.43722,
        image_url: "https://th.bing.com/th/id/OIP.NURS1fS0bKuQXYetZrnm3gAAAA?pid=ImgDet&rs=1"
    }
]
const Map = () => {
    const mapContainer = useRef(null);
    const [map, setMap] = useState<mapboxgl.Map>()
    useEffect(() => {
        if (photos.length && map) {
            photos.forEach(photo => {
                map.on('load', () => {
                    // Load an image from an external URL.
                    map.loadImage(
                        photo.image_url,
                        (error, image) => {
                            if (error) throw error;

                            // Add the image to the map style.
                            if (image) {
                                map.addImage(String(photo.id), image);
                            }

                            // Add a data source containing one point feature.
                            map.addSource(String(photo.id), {
                                'type': 'geojson',
                                'data': {
                                    'type': 'FeatureCollection',
                                    'features': [
                                        {
                                            'type': 'Feature',
                                            'geometry': {
                                                'type': 'Point',
                                                'coordinates': [photo.longitude, photo.latitude]
                                            },
                                            'properties': null
                                        }
                                    ]
                                }
                            });

                            // Add a layer to use the image to represent the data.
                            map.addLayer({
                                'id': String(photo.id),
                                'type': 'symbol',
                                'source': String(photo.id), // reference the data source
                                'layout': {
                                    'icon-image': String(photo.id), // reference the image
                                    'icon-allow-overlap': true,
                                    'icon-size': [
                                        'interpolate',
                                        ['linear'],
                                        ['zoom'],
                                        0, 0.001,
                                        5, 0.01,
                                        10, 0.1, // set size to 0.5 when zoom level is 0
                                        15, 0.15, // set size to 1.5 when zoom level is 15
                                        20, 0.2
                                    ],
                                }
                            });
                            // Add popup to the marker
                            map.on('click', String(photo.id), (e) => {
                                if (!e.features) {
                                    return
                                }
                                const popup = new mapboxgl.Popup()
                                    .setLngLat(e.lngLat)
                                    .setHTML(`<h3>${"user"}</h3><p>${"Aeljo"}</p>`)
                                    .addTo(map);
                            });
                        }
                    );

                });
            })

        }
    }, [photos, map]);

    useEffect(() => {
        const map = new mapboxgl.Map({
            //@ts-ignore
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-76.0833333, 3.9166667], //lng, lat
            zoom: 10
        });
        setMap(map);
        return () => {
            map.remove();
        };
    }, []);

    return (
        <div ref={mapContainer} style={{ height: '400px' }} />
    );
}

export default Map;
