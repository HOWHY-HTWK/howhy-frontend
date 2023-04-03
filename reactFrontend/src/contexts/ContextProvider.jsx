import {createContext, useContext, useState} from "react";

const StateContext = createContext({
    user: null,
    authenticated: false,
    setUser: () => {},
    setLoggedIn: () => {}
})

export const ContextProvider = ({children}) => {
    const [user, setUser ] = useState({});
    const [authenticated, _setAuthenticated] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setAuthenticated = (authenticated) => {
        _setAuthenticated(authenticated)
        if (authenticated){
            localStorage.setItem('ACCESS_TOKEN', authenticated);

        } else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    return(
        <StateContext.Provider value={{
            user,
            authenticated: authenticated,
            setUser, 
            setLoggedIn: setAuthenticated
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)