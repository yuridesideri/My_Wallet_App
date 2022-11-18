import { createContext, useContext, useState } from "react";
export const userContext = createContext(null)
export const useUserData =  () => useContext(userContext);


export default function UserDataProvider({children, changestate}) {


    return (
        <userContext.Provider value={changestate}>
            {children}
        </userContext.Provider>
    )
}