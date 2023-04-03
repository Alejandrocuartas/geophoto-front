import React, { useState, createContext, useContext } from "react";
const logContext = createContext<any>(1);
const Context = ({ children }: { children: JSX.Element }) => {
    const [logged, setLogged] = useState(true)
    return (
        <logContext.Provider value={{
            logged,
            setLogged
        }}>
            {children}
        </logContext.Provider>
    );
};

const useGlobalState = () => useContext(logContext);

export { Context, useGlobalState };