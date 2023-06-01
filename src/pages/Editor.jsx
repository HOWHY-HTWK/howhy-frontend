import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import LogIn from '../components/LogIn'
import { useStateContext } from '../contexts/ContextProvider'
import Header from '../components/Header'
import axiosClient from '../../axios-client'
import Footer from '../components/Footer'
import DropDown from '../components/DropDown'
import axios from 'axios'
import styles from './css/Editor.module.css'
import VerifyEmail from './VerifyEmail'

export default function Editor() {
    const { user, setUser, updateUserData } = useStateContext()

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

    return user ?
        (user && user.role == 'creator' || user.role == 'admin') ?
            user.email_verified_at != null ?
                content()
                : <VerifyEmail></VerifyEmail>
            :
            (() => {
                alert('Sie dürfen leider nicht auf diese seite zugreifen')
                return <Navigate to="/login" />
            })()
        :
        <Navigate to="/login" />
}
