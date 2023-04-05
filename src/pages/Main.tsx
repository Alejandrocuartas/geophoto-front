import * as React from 'react';
import Map from '../components/Map';
import { useGlobalState } from '../context';
import { UserRegistration, Photo } from '../types';
import { useLazyQuery } from '@apollo/client';
import { PHOTOS_QUERY } from '../queries';
const Main = () => {
    const { setUser, setLogged, socket, setPhotos, photos } = useGlobalState()
    const [lng, setLng] = React.useState(-0.118092)
    const [la, setLa] = React.useState(51.509865)
    const [Photos, { loading, error }] = useLazyQuery(PHOTOS_QUERY, {
        onCompleted: (data: { photos: Photo[] }) => {
            setPhotos(data.photos)
        }
    })

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((p) => {
            setLng(p.coords.longitude)
            setLa(p.coords.latitude)
            Photos({
                variables: {
                    lat: p.coords.latitude, long: p.coords.longitude
                }
            }).then(res => {
                if (error) {
                    alert("Unexpected error: " + error.message)
                    location.reload()
                }
            })
        }, (e) => alert("Error when getting geolocation: " + e.message), {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000,
        })
        socket.addEventListener("message", (e: any) => {
            const newP = JSON.parse(e.data);
            setPhotos([...photos, newP])
        })
        const u = localStorage.getItem("session")
        if (!u) {
            return
        }
        const us: UserRegistration = JSON.parse(u)
        setUser(us)
        setLogged(true)

    }, [])
    return (
        <Map lat={la} long={lng} />
    )
}

export default Main;