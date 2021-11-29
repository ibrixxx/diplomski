import React, {useContext, useState} from "react";

const UserContext = React.createContext()
const UserUpdateContext = React.createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export const useUserUpdate = () => {
    return useContext(UserUpdateContext)
}

const AuthProvider = ({children}) => {
    const [user, setUser] = useState({
        isAuthenticated: false,
        token: null,
        verified_at: null,
        first_name: null,
        last_name: null,
        email: null,
        type: 1,
    })


    return (
        <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={setUser}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    );
}

export default AuthProvider;
