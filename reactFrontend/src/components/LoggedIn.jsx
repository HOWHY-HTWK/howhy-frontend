import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSanctum } from 'react-sanctum'
import LogIn from './LogIn'

export default function LoggedIn() {

    // if (authenticated === true) {
        return (
            <div>
                LoggedIn
                <Outlet />
            </div>
        )
    // } else {
    //     return (
    //         <LogIn signIn={signIn}></LogIn>
    //     )
    // }
}
