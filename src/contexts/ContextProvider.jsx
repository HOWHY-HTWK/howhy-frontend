import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext({
    user: null,
    setUser: () => { },
})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('USER')));

    useEffect(() => {
        if(user){
            localStorage.setItem('USER', JSON.stringify(user))
        } else {
            localStorage.removeItem('USER')
        }
    }, [user])

    return (
        <StateContext.Provider value={{
            user,
            setUser,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)