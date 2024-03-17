import React from "react"
import logoBig from "../../../assets/logo_big.png"
import { Link } from "react-router-dom"
import styles from "./Header.module.css"

/**
 * The Header for the Editor Frontend. Takes children that are displayed on the right side.
 *
 * @param {Array} childen
 * @returns
 */
export default function Header({ children }) {
    return (
        <div className={[styles.background, styles.editorBackground].join(" ")}>
            <Link to={"/editor"} className={[styles.home].join(" ")}>
                <img className={[styles.imgLogo].join(" ")} src={logoBig} />
            </Link>
            {children}
        </div>
    )
}
