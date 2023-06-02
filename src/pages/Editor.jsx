import React, { useEffect, useLayoutEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DropDown from '../components/DropDown'
import styles from './css/Editor.module.css'
import VerifyEmail from './VerifyEmail'

export default function Editor() {
    const { user, setUser, updateUserData } = useStateContext()
    const currentPath = useLocation().pathname;


    console.log(user)

    useEffect(() => {
		updateUserData()
	}, [])

    function content() {
        return (
            <div className={['pageWrap'].join(' ')} >
                <Header editorMode={true}>
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
                return <Navigate to="/login" state={{backPath: currentPath}} />
            })()
        :
        <Navigate to="/login" state={{backPath: currentPath}}/>
    )
}
