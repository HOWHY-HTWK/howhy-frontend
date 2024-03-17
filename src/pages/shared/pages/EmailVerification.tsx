import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "./EmailVerification.module.css"
import { useStateContext } from "../../../contexts/ContextProvider"
import { verifyEmail } from "../../../utils/api/api"
import LogInComponent from "../../../pages/editor/login/LogInComponent"

/**
 * This Page is reached when the User clicks the Email verification Link in the E-Mail.
 * With the information from the Link a verification Request is made to the backend to verify the
 * e-mail adress. When its succesfull a confirmation is displayed.
 * @returns
 */
export default function EmailVerification() {
    const { id, hash } = useParams()
    const queryParameters = new URLSearchParams(window.location.search)
    const expires = queryParameters.get("expires")
    const signature = queryParameters.get("signature")

    const { user, setUser } = useStateContext()
    const [message, setMessage] = useState(null)

    useEffect(() => {
        tryVerification()
    }, [user])

    function tryVerification() {
        console.log("try")
        verifyEmail(id, hash, expires, signature)
            .then((response) => {
                setMessage(
                    "Email erfolgreich verifiziert! Sie Können diese Seite jetzt schließen."
                )
            })
            .catch((error) => {
                console.log(error)
                setMessage(error.response.data.message)
            })
    }

    return user ? (
        <div className={[styles.text].join(" ")}>{message}</div>
    ) : (
        <div className={["centerVertical"].join(" ")}>
            <p className={[styles.text].join(" ")}>
                Bitte Loggen sie sich ein um ihre Email Adresse zu verifizieren.
            </p>
            <LogInComponent successCallback={undefined}></LogInComponent>
        </div>
    )
}
