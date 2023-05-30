import { createContext, useContext, useEffect, useState } from "react";
import { refreshUser } from "../api";

const StateContext = createContext({
    user: null,
    setUser: () => { },
    updateUserData: () => { }
})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('USER')));

    function updateUserData() {
        refreshUser().then(response => {
			setUser(response.data)
		})
    }

    useEffect(() => {
        if (user) {
            localStorage.setItem('USER', JSON.stringify(user))
        } else {
            localStorage.removeItem('USER')
        }
    }, [user])

    return (
        <StateContext.Provider value={{
            user,
            setUser,
            updateUserData,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)