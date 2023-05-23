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
    const { user, setUser } = useStateContext()

    axiosClient.interceptors.response.use(
        res => {
            return res;
        },
        err => {
            // alert(err.response.data.message)
            if (err.response.status === 401) {
                console.log(err.response)
                setUser(null)
            }
            if (err.response.status === 403) {
                console.log(err.response.data.message)
            }
            throw err;
        }
    )

    useEffect(() => {
        axiosClient.get('/sanctum/csrf-cookie')
            .then(response => {
                axiosClient.get('api/check').then(response => {
                    console.log(response)
                }).catch(error => {
                    console.log(error.response)
                })
            }).catch(error => {
                console.log(error.response.data)
            }
            )
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
