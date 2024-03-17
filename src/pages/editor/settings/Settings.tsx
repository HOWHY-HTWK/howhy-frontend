import React, { useEffect } from "react"
import styles from "./Settings.module.css"
import AllowedEmails from "./components/AllowedEmails"
import { useStateContext } from "../../../contexts/ContextProvider"
import ChangeRights from "./components/ChangeRights"

/**
 * Wrapper for the User List and allowed-E-Mail List.
 * @returns
 */
export default function Settings() {
    const { user } = useStateContext()

    useEffect(() => {
        document.title = "Einstellungen"
    }, [])

    return (
        <div className={styles.wrap}>
            <h3>Einstellungen</h3>
            {user.role == "admin" ? (
                <div className={styles.contentWrap}>
                    <ChangeRights></ChangeRights>
                    <AllowedEmails></AllowedEmails>
                </div>
            ) : null}
        </div>
    )
}
