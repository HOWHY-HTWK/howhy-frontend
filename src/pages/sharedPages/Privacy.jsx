import React from 'react'
import styles from './Imprint.module.css'
import SubPageLayout from 'src/sharedComponents/SubPageLayout'

/**
 * Displays the Privacy statement.
 * @returns 
 */
export default function Privacy() {
    return (
        <SubPageLayout>
            <iframe className={[styles.iframe].join(' ')} src="https://howhy.htwk-leipzig.de/info/datenschutz.html"></iframe>
        </SubPageLayout>
    )
}
