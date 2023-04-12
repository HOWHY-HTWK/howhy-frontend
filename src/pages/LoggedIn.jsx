import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LogIn from '../components/LogIn'
import { useStateContext } from '../contexts/ContextProvider'
import Header from '../components/Header'
import axiosClient from '../../axios-client'
import Footer from '../components/Footer'
import styles from './css/LoggedIn.module.css'

export default function LoggedIn() {
    const { user, authenticated, setLoggedIn: setStatus } = useStateContext()

    axiosClient.interceptors.response.use(
        res =>  {
            return res;
        },
        err => {
            if (err.response.status === 401) {
                setStatus(false)
            }
            throw err;
        }
    )

    useEffect(() => {
        axiosClient.get('api/check').then(response => {
            console.log(response)
        }).catch(error => {
        })
    }, [])

    if (authenticated) {
        return (
            <div className={styles.wrap}>
                <Header></Header>
                <Outlet />
                <Footer></Footer>
            </div>
        )
    } else {
        return <LogIn></LogIn>
    }
}
