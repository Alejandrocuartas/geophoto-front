import React, { useState, createContext, useContext } from "react";
import { GlobalContext } from "../types";
//@ts-ignore
const logContext = createContext<GlobalContext>();
const Context = ({ children }: { children: JSX.Element }) => {
    const [logged, setLogged] = useState(false)
    const [user, setUser] = useState({ username: "", id: "", jwt: "" })
    return (
        <logContext.Provider value={{
            logged,
            setLogged,
            user,
            setUser
        }}>
            {children}
        </logContext.Provider>
    );
};

const useGlobalState = () => useContext(logContext);

export { Context, useGlobalState };