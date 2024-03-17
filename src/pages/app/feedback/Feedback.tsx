import React from "react"
import styles from "./Feedback.module.css"
import UserSubPageLayout from "../../shared/components/UserSubPageLayout"
import { FEEDBACK_DESCRIPTION, FEEDBACK_EMAIL_ADRESS } from "../../../constants/strings"

export default function Feedback() {
    return (
        <UserSubPageLayout title={ "Feedback" }>
            <div
                className={ [ styles.content ].join(" ") }
                style={ { marginTop: "80px", whiteSpace: "pre-line" } }
            >
                { FEEDBACK_DESCRIPTION }
                <a href={`mailto:${FEEDBACK_EMAIL_ADRESS}`}>
                    { FEEDBACK_EMAIL_ADRESS }
                </a>
            </div>
        </UserSubPageLayout>
    )
}
