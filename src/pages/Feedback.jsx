import React from 'react'
import styles from './css/Feedback.module.css'

export default function Feedback() {
    return (
        <div className={['centerVertical', styles.wrap].join(' ')}
            style={{ marginTop: "80px" }}>
            Um Feedback zu hinterlassen kannst du eine E-Mail an die folgende Adresse schicken.
            <a className={[].join(' ')} href="mailto:howhy@htwk-leipzig.de">howhy@htwk-leipzig.de</a>
        </div>
    )
}
