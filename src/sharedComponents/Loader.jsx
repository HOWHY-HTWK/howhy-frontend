import React from 'react'
import styles from './Loader.module.css'

/**
 * A simple animated circle than can be displayed when something is still loading.
 * @returns 
 */
export default function Loader() {
    return (
        <div className={['center', styles.wrap].join(' ')} >
            <div className={[styles.loader].join(' ')} ></div>
        </div>
    )
}
