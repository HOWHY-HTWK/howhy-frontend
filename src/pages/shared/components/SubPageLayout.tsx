import React from "react"
import styles from "./SubPageLayout.module.css"

export default function SubPageLayout({ children }) {
    return (
        <>
            <div className={[styles.bar].join(" ")}></div>
            {children}
        </>
    )
}
