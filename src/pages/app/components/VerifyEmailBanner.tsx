import React, { useState } from "react"
import styles from "./VerifyEmailBanner.module.css"
import { MdClose } from "react-icons/md"
import axiosClient from "../../../utils/api/axios-client"

/**
 * Returns the banner that shows that the E-mail Address needs to be verified. It can be closed and
 * stores this state until the Page gets reloaded. It contains a Button to resend the
 * E-mail Link.
 */
export default function VerifyEmailBanner() {
    const [closed, setClosed] = useState(false)

    function resendLink() {
        axiosClient
            .post("/email/verification-notification")
            .then((response) => {
                alert("Ein neuer Link wurde gesendet")
            })
    }

    return (
        <div className={[styles.wrap, closed ? styles.closed : null].join(" ")}>
            <div
                className={[styles.closeWrap].join(" ")}
                onClick={() => setClosed(true)}
            >
                <MdClose></MdClose>
            </div>
            <div className={["center", styles.content].join(" ")}>
                <div>
                    Bitte verifiziere deine E-Mail Adresse um alle Funktionen
                    nutzen zu können
                </div>
                <button className={["button"].join(" ")} onClick={resendLink}>
                    Link erneut senden
                </button>
            </div>
        </div>
    )
}
