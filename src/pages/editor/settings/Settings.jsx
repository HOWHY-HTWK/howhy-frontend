import React, { useEffect } from 'react'
import styles from './Settings.module.css'
import AddEmail from 'src/pages/editor/settings/AddEmail';
import ChangeRights from 'src/pages/editor/settings/ChangeRights';
import { useStateContext } from 'src/contexts/ContextProvider';

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
                    <AddEmail></AddEmail>
                </div>
                : null}
        </div>
    )
}
