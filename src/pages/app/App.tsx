import React, { useEffect, useRef, useState } from "react"
import styles from "./App.module.css"
import { Outlet } from "react-router-dom"
import VerifyEmailBanner from "./components/VerifyEmailBanner"
import { Header } from "./header/Header"
import { useStateContext } from "../../contexts/ContextProvider"
import Footer from "../shared/components/Footer"

/**
 * This is the entrypoint for the User Frontend. Here the Header and Footer get displayed.
 * Also, the user data gets updated when the Page loads.
 */
function App() {
    const windowSize = useRef([window.innerWidth, window.innerHeight])

    const { user, setUser, updateUserData } = useStateContext()

    const [frame, setFrame] = useState(isSmartphone(windowSize.current))

    useEffect(() => {
        updateUserData()
    }, [])

    function toggleFrame() {
        setFrame((prev) => !prev)
    }

    function isSmartphone(windowSize) {
        // if (windowSize[0] < 1000) {
        // 	return false
        // } else {
        // 	return true
        // }
        return false
    }

    return (
        <div className={[frame ? styles.phone : styles.phoneOff].join(" ")}>
            <div className={["pageWrap", styles.background].join(" ")}>
                <Header />
                <Outlet />
                <Footer />
            </div>
            {user && user.email_verified_at == null ? (
                <VerifyEmailBanner></VerifyEmailBanner>
            ) : null}
            {/* <div className={[styles.toggle].join(' ')} onClick={toggleFrame}>Toggle Frame</div> */}
        </div>
    )
}

export default App
