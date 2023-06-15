import React from 'react'
import styles from './css/UserSettings.module.css'
import { logout } from '../utils'
import { deleteUser } from '../api'
import { useStateContext } from '../contexts/ContextProvider'
import { useNavigate } from 'react-router-dom'

export default function UserSettings() {
    const navigate = useNavigate()
    const { user, setUser } = useStateContext()

    function deleteRequest() {
        if (confirm('Bist du dir sicher dass du dein Benutzerkonto unwiederruflich löschen möchtest?')) {
            deleteUser().then(response => {
                navigate('/')
                logout(setUser)
            }).catch(error => {

            })
        }
    }

    return (
        <div className={['centerVertical', styles.wrap].join(' ')} >
            <div className={['button', styles.deleteButton].join(' ')}
                onClick={deleteRequest}>Konto Löschen</div>
        </div>
    )
}
