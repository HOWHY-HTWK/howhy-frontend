import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LogIn from './LogIn'
import { useStateContext } from '../contexts/ContextProvider'
import Header from './Header'
import axiosClient from '../../axios-client'

export default function LoggedIn() {
    const { user, authenticated, setLoggedIn: setStatus } = useStateContext()

    axiosClient.interceptors.response.use(
        function (response) {
            return response
        },
        function (error) {
            if (error.response.status == 401 || 419) {
                setStatus(false)
            }
        }
    )

    axiosClient.get('api/check').then(response => {
        console.log(response)
    }).catch(error => {
    })

    if (authenticated) {
        return (
            <>
                <Header></Header>
                <Outlet />
            </>
        )
    } else {
        return <LogIn></LogIn>
    }
}
