import React from "react"
import styles from "./Footer.module.css"
import { Link } from "react-router-dom"

/**
 * The Footer for the whole Application. Contains Links to Privacy and Imprint.
 * @returns
 */
export default function Footer() {
    return (
        <div className={styles.bar}>
            <Link to={"/user/privacy"} className={[styles.link].join(" ")}>
                Datenschutz
            </Link>
            <Link to={"/user/imprint"} className={[styles.link].join(" ")}>
                Impressum
            </Link>
        </div>
    )
}
