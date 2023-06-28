import React from 'react'
import styles from './UserSubPageLayout.module.css'

export default function UserSubPageLayout({ children, title }) {
    return (
        <div className={[styles.wrap].join(' ')} >
            <div className={[styles.title].join(' ')} >{title}</div>
            <div className={[styles.contentWrap].join(' ')} >
                {children}
            </div>
        </div>
    )
}
