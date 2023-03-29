import React, { useState, createContext, useContext } from "react";
const logContext = createContext<number>(1);
const Context = ({ children }: { children: JSX.Element }) => {
    return (
        <logContext.Provider value={1}>
            {children}
        </logContext.Provider>
    );
};

const useGlobalState = () => useContext(logContext);

export { Context, useGlobalState };