import React from "react";
import { createContext, useState } from "react";

export const MIDContext = createContext();

export const MIDContextProvider = ({children}) => {

    const [mID, setMID] = useState("");

    return (
        <MIDContext.Provider value={{mID, setMID}}>
            { children }
        </MIDContext.Provider>
    )

}

