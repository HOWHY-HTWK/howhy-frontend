import React, { useEffect, useLayoutEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useStateContext } from 'src/contexts/ContextProvider'
import Header from './components/Header'
import Footer from 'src/sharedComponents/Footer'
import DropDown from './components/DropDown'
import styles from './Editor.module.css'
import VerifyEmail from 'src/pages/sharedPages/VerifyEmail'

/**
 * Wrapper for the Editor Part of the Application. In the Editor the Questions for the Videos,
 * the Prizes and User Rights can be changed. Here Header and Footer for the whole Editor are rendered.
 * When the user is not logged or doesnt have editor or admin rights the User gets 
 * redirected to the login page. If the users Email is not verified an error message is displayed.
 * 
 * @returns 
 */
export default function Editor() {
    const { user, setUser, updateUserData } = useStateContext()
    const currentPath = useLocation().pathname;

    useEffect(() => {
        updateUserData()
    }, [])

    function content() {
        return (
            <div className={['pageWrap'].join(' ')} >
                <Header>
                    <DropDown></DropDown>
                </Header>
                <Outlet />
                <Footer></Footer>
            </div>
        )
    }

    return (
        user ?
            (user && user.role == 'creator' || user.role == 'admin') ?
                user.email_verified_at != null ?
                    content()
                    :
                    <VerifyEmail></VerifyEmail>
                :
                (() => {
                    alert('Sie dürfen leider nicht auf diese seite zugreifen')
                    return <Navigate to="/login" state={{ backPath: currentPath }} />
                })()
            :
            <Navigate to="/login" state={{ backPath: currentPath }} />
    )
}
