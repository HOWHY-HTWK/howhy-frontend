import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import styles from "./Header.module.css"
import profil from "src/assets/icons/Profil.svg"
import back from "src/assets/icons/back.svg"
import { useStateContext } from "../../../contexts/ContextProvider"
import Score from "./components/Score"

/**
 * Returns the Header for the User Frontend. It contains Score Search Link and the Link to the User Page.
 * It detects when the User is on a subpage and displays the Back arrow accordingly.
 */
export const Header = () => {
    const { user } = useStateContext()
    const navigate = useNavigate()
    const location = useLocation()
    const subRoute = !(location.pathname == "/")

    return (
        <div className={["center", styles.background].join(" ")}>
            <div className={[styles.topbar].join(" ")}>
                <div className={["center", styles.rightWrap].join(" ")}>
                    <Score />
                </div>
                <div className={["center", styles.leftWrap].join(" ")}>
                    {subRoute ? (
                        <img
                            className={[styles.back].join(" ")}
                            src={back}
                            onClick={() => navigate(-1)}
                            alt={"back"}
                        ></img>
                    ) : null}
                    {user ? (
                        <>
                            <Link
                                to={"/user"}
                                className={[styles.home].join(" ")}
                            >
                                <img
                                    className={[styles.imgLogo].join(" ")}
                                    src={profil}
                                    alt={"profil"}
                                />
                                <div className={[styles.username].join(" ")}>
                                    {user ? user.name : ""}
                                </div>
                            </Link>
                        </>
                    ) : (
                        <div
                            className={[
                                "button",
                                "center",
                                styles.loginButton,
                                styles.loginButton
                            ].join(" ")}
                            onClick={() => navigate("/userlogin")}
                        >
                            Einloggen
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
