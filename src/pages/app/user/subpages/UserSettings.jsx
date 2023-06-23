import React from 'react'
import styles from './UserSettings.module.css'
import { logout } from 'src/utils/utils'
import { deleteUser } from 'src/utils/api/api'
import { useStateContext } from 'src/contexts/ContextProvider'
import { useNavigate } from 'react-router-dom'

export default function UserSettings() {
    const navigate = useNavigate()
    const { user, setUser } = useStateContext()

    function deleteRequest() {
        if (confirm('Bist du dir sicher dass du dein Benutzerkonto unwiederruflich löschen möchtest?')) {
            deleteUser().then(response => {
                navigate('/')
                logout(setUser)
            }).catch(error => { })
        }
    }

    return (
        <div className={[styles.wrap].join(' ')} >
            <div className={[styles.title].join(' ')} >Einstellungen</div>
            <div className={[styles.contentWrap].join(' ')} >
                <div className={['button', styles.deleteButton].join(' ')}
                    onClick={deleteRequest}>Konto Löschen</div>
            </div>
        </div>
    )
}
