import { createContext, useState } from "react";

export const UserContext = createContext(null);

export default function UserContextProvider({children}) {
    const [user, setUser] = useState({username: ""});


    return <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
}