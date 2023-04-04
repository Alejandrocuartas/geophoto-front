import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useGlobalState } from '../context';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlMzFqbyIsImEiOiJja3U1eHF6c3IwMHdxMnZuejFwZmNpNzZjIn0.SneF3ILRiMT9XjP0ncOiEQ';

const Map = ({ long, lat }: { long: number, lat: number }) => {
    const { photos } = useGlobalState()
    const mapContainer = useRef(null);
    const [map, setMap] = useState<mapboxgl.Map>()
    useEffect(() => {
        if (photos.length && map) {
            photos.forEach(photo => {
                map.on('load', () => {
                    // Load an image from an external URL.
                    map.loadImage(
                        photo.url,
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
                                                'coordinates': [photo.location.coordinates[0], photo.location.coordinates[1]],
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
                                        5, 0.005,
                                        10, 0.01, // set size to 0.5 when zoom level is 0
                                        15, 0.05, // set size to 1.5 when zoom level is 15
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
                                    .setHTML(`<h3>${"user"}</h3><p>${photo.user.username}</p>`)
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
            center: [long, lat], //lng, lat
            zoom: 15
        });
        setMap(map);
        return () => {
            map.remove();
        };
    }, [long, lat, photos]);

    return (
        <div ref={mapContainer} style={{ height: '400px' }} />
    );
}

export default Map;
