import React from 'react'
import styles from './Feedback.module.css'

export default function Feedback() {
    return (
        <div className={[styles.wrap].join(' ')} >
            <div className={[styles.title].join(' ')} >Feedback</div>
            <div className={[styles.contentWrap].join(' ')} >
                <div className={[styles.content].join(' ')}
                    style={{ marginTop: "80px" }}>
                    Um Feedback zu hinterlassen kannst du eine E-Mail an die folgende Adresse schicken.<br></br>
                    <a className={[].join(' ')} href="mailto:howhy@htwk-leipzig.de">howhy@htwk-leipzig.de</a>
                </div>
            </div>
        </div>
    )
}
