import { createContext, useContext, useState } from "react";
export const userContext = createContext(null)
export const useUserData = () => useContext(userContext);


export default function UserDataProvider({children}) {
    const [userData, setUserData] = useState({});

    return (
        <userContext.Provider value={[userData, setUserData]}>
            {children}
        </userContext.Provider>
    )
}