import React from 'react'
import styles from './Feedback.module.css'
import UserSubPageLayout from 'src/sharedComponents/UserSubPageLayout'

export default function Feedback() {
    return (
        <UserSubPageLayout title={'Feedback'}>
            <div className={[styles.content].join(' ')}
                style={{ marginTop: "80px" }}>
                Um Feedback zu hinterlassen kannst du eine E-Mail an die folgende Adresse schicken.<br></br>
                <a className={[].join(' ')} href="mailto:howhy@htwk-leipzig.de">howhy@htwk-leipzig.de</a>
            </div>
        </UserSubPageLayout>
    )
}
