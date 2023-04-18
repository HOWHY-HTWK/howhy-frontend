import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LogIn from '../components/LogIn'
import { useStateContext } from '../contexts/ContextProvider'
import Header from '../components/Header'
import axiosClient from '../../axios-client'
import Footer from '../components/Footer'
import styles from './css/Editor.module.css'
import DropDown from '../components/DropDown'

export default function Editor() {
    const { user, authenticated, setUser, setAuthenticated } = useStateContext()

    axiosClient.interceptors.response.use(
        res => {
            return res;
        },
        err => {
            if (err.response.status === 401) {
                setAuthenticated(false)
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
                })
            })
    }, [])

    if (user) {
        return (
            <div className={styles.wrap}>
                <Header editorMode={true}>
                    <DropDown></DropDown>
                </Header>
                <Outlet />
                <Footer></Footer>
            </div>
        )
    } else {
        return <LogIn></LogIn>
    }
}
