import React from 'react'
import styles from './UserSettings.module.css'
import { logout } from 'src/utils/utils'
import { deleteUser } from 'src/utils/api/api'
import { useStateContext } from 'src/contexts/ContextProvider'
import { useNavigate } from 'react-router-dom'
import UserSubPageLayout from 'src/sharedComponents/UserSubPageLayout'

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
        <UserSubPageLayout title={'Einstellungen'}>
            <div className={['button', styles.deleteButton].join(' ')}
                onClick={deleteRequest}>Konto Löschen</div>
        </UserSubPageLayout>
    )
}
