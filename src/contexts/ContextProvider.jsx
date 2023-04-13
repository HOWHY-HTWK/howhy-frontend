import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext({
    user: null,
    authenticated: false,
    setUser: () => { },
    setAuthenticated: () => { }
})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('USER')));
    const [authenticated, setAuthenticated] = useState(localStorage.getItem('ACCESS_TOKEN'));

    useEffect(() => {
        localStorage.setItem('USER', JSON.stringify(user))
    }, [user])

    useEffect(() => {
        if (authenticated) {
            localStorage.setItem('ACCESS_TOKEN', authenticated);
        } else {
            localStorage.removeItem('ACCESS_TOKEN')
            localStorage.removeItem('USER')
            setUser(null)
        }
    }, [authenticated])

    return (
        <StateContext.Provider value={{
            user,
            authenticated: authenticated,
            setUser,
            setAuthenticated
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)