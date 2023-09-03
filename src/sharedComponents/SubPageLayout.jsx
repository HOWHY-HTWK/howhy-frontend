import React from 'react'
import styles from './SubPageLayout.jsx'

export default function SubPageLayout({ children }) {
    return (
        <>
            <div className={[styles.bar].join(' ')} ></div>
            {children}
        </>
    )
}
