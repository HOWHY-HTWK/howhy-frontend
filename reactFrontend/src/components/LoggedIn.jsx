import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LogIn from './LogIn'
import { useStateContext } from '../contexts/ContextProvider'
import Header from './Header'

export default function LoggedIn() {
    const {user, authenticated, setStatus} = useStateContext()

    if(authenticated){
        return (
            <>
                <Header></Header>
                <Outlet />
            </>
        )
    } else{
        return <LogIn></LogIn>
    }
}
