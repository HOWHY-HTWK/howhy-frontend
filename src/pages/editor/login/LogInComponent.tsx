import React, { createRef, useState } from "react"
import styles from "./Login.module.css"
import { useStateContext } from "../../../contexts/ContextProvider"
import axiosClient from "../../../utils/api/axios-client"
import { useNavigate } from "react-router-dom"

export default function LogInComponent({ successCallback }) {
    const { setUser } = useStateContext()
    const navigate = useNavigate()
    const emailRef = createRef<HTMLInputElement>()
    const passwordRef = createRef<HTMLInputElement>()
    const [remember, setRemember] = useState(false)

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
                    successCallback()
                })
                .catch((error) => {
                    alert(error.response.data.message)
                    console.log(error.response)
                })
        })
    }

    function getLogin() {
        return (
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
            </div>
        )
    }

    return getLogin()
}
