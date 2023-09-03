import React, { useEffect } from 'react'
import styles from './Settings.module.css'
import ChangeRights from 'src/pages/editor/settings/ChangeRights';
import { useStateContext } from 'src/contexts/ContextProvider';
import AllowedEmails from './AllowedEmails';

/**
 * Wrapper for the User List and allowed-E-Mail List.
 * @returns 
 */
export default function Settings() {
    const { user, setUser } = useStateContext()

    useEffect(() => {
        document.title = "Einstellungen";
    }, [])

    return (
        <div className={styles.wrap}>
            <h3>Einstellungen</h3>
            {user.role == 'admin' ?
                <div className={styles.contentWrap}>
                    <ChangeRights></ChangeRights>
                    <AllowedEmails></AllowedEmails>
                </div>
                : null}
        </div>
    )
}
