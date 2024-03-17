import React, { createRef } from "react"
import styles from "./ForgotPassword.module.css"
import { useNavigate } from "react-router-dom"
import { csfrCookie, resetPassword } from "../../../utils/api/api"

/**
 * This Page is reached when the user clicks on the password reset link in the corresponing e-mail.
 * The User can enter a new password with confirmation and a password reset request is made with
 * the Information from the reste link.
 */

export default function ResetPassword() {
    const navigate = useNavigate()
    const queryParameters = new URLSearchParams(window.location.search)
    const email = queryParameters.get("email")
    const token = queryParameters.get("token")

    const passwordRef = createRef<HTMLInputElement>()
    const repeatPasswordRef = createRef<HTMLInputElement>()

    function handleSetNewPassword(e) {
        e.preventDefault()
        setNewPassword(
            passwordRef.current.value,
            repeatPasswordRef.current.value
        )
    }

    function setNewPassword(password, repeatPassword) {
        csfrCookie().then((response) => {
            console.log(
                email + "|" + password + "|" + repeatPassword + "|" + token
            )
            resetPassword(email, password, repeatPassword, token)
                .then((response) => {
                    console.log(response)
                    navigate("/login")
                })
                .catch((error) => {
                    alert(error.response.data.message)
                    console.log(error.response)
                })
        })
    }

    return (
        <div className={[styles.formwrapper].join(" ")}>
            <form
                method="post"
                className={[styles.vertical].join(" ")}
                onSubmit={handleSetNewPassword}
            >
                <span>Neues Passwort eingeben</span>
                <input
                    className={[styles.input].join(" ")}
                    ref={passwordRef}
                    type="password"
                    name="password"
                    placeholder="Passwort"
                    autoComplete="new-password"
                />
                <input
                    className={[styles.input].join(" ")}
                    ref={repeatPasswordRef}
                    type="password"
                    name="repeat-password"
                    placeholder="Passwort wiederholen"
                    autoComplete="new-password"
                />
                <button className={["button"].join(" ")} type="submit">
                    Neues Passwort speichern
                </button>
            </form>
        </div>
    )
}
