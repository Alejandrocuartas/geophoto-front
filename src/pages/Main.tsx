import * as React from 'react';
import Map from '../components/Map';
import { useGlobalState } from '../context';
import { UserRegistration } from '../types';

const Main = () => {
    const { setUser, setLogged } = useGlobalState()
    React.useEffect(() => {
        const u = localStorage.getItem("session")
        if (!u) {
            return
        }
        const us: UserRegistration = JSON.parse(u)
        setUser(us)
        setLogged(true)
    }, [])
    return (
        <h1>hi</h1>
    )
}

export default Main;