import React from "react"
import styles from "./Imprint.module.css"
import SubPageLayout from "../components/SubPageLayout"

/**
 * Shows the Imprint
 * @returns
 */
export default function Imprint() {
    return (
        <SubPageLayout>
            <iframe
                className={[styles.iframe].join(" ")}
                src="https://howhy.htwk-leipzig.de/info/impressum.html"
            ></iframe>
        </SubPageLayout>
    )
}
