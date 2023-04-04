import React, { useState, createContext, useContext } from "react";
import { GlobalContext, Photo } from "../types";
const socket = new WebSocket(`wss://${process.env.API}/ws`)
//@ts-ignore
const logContext = createContext<GlobalContext>();
const Context = ({ children }: { children: JSX.Element }) => {
    const [logged, setLogged] = useState(false)
    const [user, setUser] = useState({ username: "", id: "", jwt: "" })
    const [photos, setPhotos] = useState<Photo[]>([])
    return (
        <logContext.Provider value={{
            logged,
            setLogged,
            user,
            setUser,
            socket,
            photos,
            setPhotos
        }}>
            {children}
        </logContext.Provider>
    );
};

const useGlobalState = () => useContext(logContext);

export { Context, useGlobalState };