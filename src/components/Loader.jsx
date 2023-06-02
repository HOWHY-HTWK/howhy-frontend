import React from 'react'
import styles from './css/Loader.module.css'

export default function Loader() {
    return (
        <div className={['center', styles.wrap].join(' ')} >
            <div className={[styles.loader].join(' ')} ></div>
        </div>
    )
}
