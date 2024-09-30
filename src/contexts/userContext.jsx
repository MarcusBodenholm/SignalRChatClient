import { createContext } from "react";

export const UserContext = createContext(null);

export default function UserContextProvider({children}) {
    //const [user, setUser] = useState(null);


    return <UserContext.Provider>
        {children}
    </UserContext.Provider>
}