import { useEffect, useRef, useState } from 'react'
import styles from './App.module.css'
import { Navigate, Outlet } from 'react-router-dom'
import Footer from 'src/sharedComponents/Footer'
import { useStateContext } from 'src/contexts/ContextProvider'
import VerifyEmailBanner from './components/VerifyEmailBanner'
import UserHeader from './components/UserHeader'

/**
 * This is the entrypoint for the User Frontend. Here the Header and Footer get displayed.
 * Also the user data gets updated when the Page loads.
 * @returns 
 * 
 */
function App() {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);

    const { user, setUser, updateUserData } = useStateContext()

    const [frame, setFrame] = useState(determinIfSmartphone(windowSize.current));

    useEffect(() => {
        updateUserData()
    }, [])

    function toggleFrame() {
        setFrame(prev => !prev)
    }

    function determinIfSmartphone(windowSize) {
        // if (windowSize[0] < 1000) {
        // 	return false
        // } else {
        // 	return true
        // }
        return false
    }

    return (
        <div className={[frame ? styles.phone : styles.phoneOff].join(' ')} >
            <div className={['pageWrap', styles.background].join(' ')} >
                <UserHeader ></UserHeader>
                <Outlet />
                <Footer></Footer>
            </div>
            {user && user.email_verified_at == null ?
                <VerifyEmailBanner></VerifyEmailBanner>
                : null
            }
            {/* <div className={[styles.toggle].join(' ')} onClick={toggleFrame}>Toggle Frame</div> */}
        </div>
    )
}

export default App
