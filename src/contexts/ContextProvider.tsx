import React, {
    createContext,
    Dispatch,
    useContext,
    useEffect,
    useState
} from "react"
import { refreshUser } from "../utils/api/api"

interface StateContextProps {
    user: any
    setUser: Dispatch<any>
    updateUserData: () => void
}

const StateContext = createContext<StateContextProps>({
    user: null,
    setUser: () => {},
    updateUserData: () => {}
})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("USER")))

    function updateUserData() {
        refreshUser()
            .then((response) => {
                setUser(response.data)
            })
            .catch((error) => {
                if (error.response.data.message === "Unauthenticated.") {
                    setUser(null)
                }
            })
    }

    useEffect(() => {
        if (user) {
            localStorage.setItem("USER", JSON.stringify(user))
        } else {
            localStorage.removeItem("USER")
        }
    }, [user])

    return (
        <StateContext.Provider
            value={{
                user,
                setUser,
                updateUserData
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
