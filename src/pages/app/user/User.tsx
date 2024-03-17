import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import styles from "./UserPage.module.css"
import back from "src/assets/icons/back.svg"

/**
 * The wrapper Page for all the User Settings. It always displays a Back over all Subpages.
 */
export default function User() {
    const navigate = useNavigate()

    return (
        <div className={[styles.userWrap].join(" ")}>
            <img
                className={[styles.back].join(" ")}
                src={back}
                onClick={() => navigate(-1)}
            ></img>
            <Outlet />
        </div>
    )
}
