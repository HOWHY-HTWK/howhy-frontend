import React, { createRef, useState } from "react"
import styles from "./Login.module.css"
import SignUp from "./SignUp"
import { useLocation, useNavigate } from "react-router-dom"
import { useStateContext } from "../../../contexts/ContextProvider"
import axiosClient from "../../../utils/api/axios-client"

/**
 * The Login and Signup Page for the Editor Frontend.
 * @returns
 */
export default function LogIn() {
    const navigate = useNavigate()
    const location = useLocation()
    const backPath = location.state ? location.state.backPath : "/editor"

    const { setUser } = useStateContext()

    const emailRef = createRef<HTMLInputElement>()
    const passwordRef = createRef<HTMLInputElement>()
    const [remember, setRemember] = useState(false)

    const [signUp, setSignUp] = useState(false)

    function handleLogin(e) {
        e.preventDefault()
        logIn(emailRef.current.value, passwordRef.current.value, remember)
    }

    function logIn(email, password, remember) {
        axiosClient.get("/sanctum/csrf-cookie").then((response) => {
            axiosClient
                .post("/login", {
                    email: email,
                    password: password,
                    remember: remember
                })
                .then((response) => {
                    console.log(response)
                    setUser(response.data)
                    navigate(backPath)
                })
                .catch((error) => {
                    alert(error.response.data.message)
                    console.log(error.response)
                })
        })
    }

    function toggleSignUp() {
        setSignUp(!signUp)
    }

    return signUp ? (
        <SignUp toggleSignUp={toggleSignUp} logIn={logIn}></SignUp>
    ) : (
        <div className={[styles.formwrapper].join(" ")}>
            <form
                method="post"
                className={[styles.vertical].join(" ")}
                onSubmit={handleLogin}
            >
                <span>Log In</span>
                <input
                    className={[styles.input].join(" ")}
                    ref={emailRef}
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    autoComplete="username"
                />
                <input
                    className={[styles.input].join(" ")}
                    ref={passwordRef}
                    type="password"
                    name="password"
                    placeholder="Passwort"
                    autoComplete="current-password"
                />
                <label>
                    Angemeldet Bleiben
                    <input
                        className={[styles.input].join(" ")}
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        type="checkbox"
                        name="remember"
                    ></input>
                </label>
                <button className={["button"].join(" ")} type="submit">
                    LogIn
                </button>
            </form>
            <div
                className={[styles.forgot].join(" ")}
                onClick={() => navigate("/forgot-password")}
            >
                Passwort vergessen?
            </div>
            <div className={[styles.register].join(" ")} onClick={toggleSignUp}>
                {" "}
                Registrieren
            </div>
        </div>
    )
}
