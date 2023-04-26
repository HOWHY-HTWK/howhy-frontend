import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import LogIn from '../components/LogIn'
import { useStateContext } from '../contexts/ContextProvider'
import Header from '../components/Header'
import axiosClient from '../../axios-client'
import Footer from '../components/Footer'
import styles from './css/Editor.module.css'
import DropDown from '../components/DropDown'

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

    if (user) {
        if (user && user.role == 'creator' || user.role == 'admin') {
            return (
                <div className={['pageWrap'].join(' ')} >
                    <Header editorMode={true}>
                        <DropDown></DropDown>
                    </Header>
                    <Outlet />
                    <Footer></Footer>
                </div>
            )
        } else {
            alert('Sie dürfen leider nicht auf diese seite zugreifen')
            return (
                <LogIn showEditorOption={true}></LogIn>
            )
        }
    }
    else {
        return (
            <LogIn showEditorOption={true}></LogIn>
        )
    }
}
