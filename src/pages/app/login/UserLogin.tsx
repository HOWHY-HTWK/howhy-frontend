import React, { useState } from "react"
import styles from "./UserLogin.module.css"
import { useNavigate } from "react-router-dom"

import howhyLogo from "src/assets/login_logo.svg"
import background from "src/assets/Muster.svg"
import { useStateContext } from "../../../contexts/ContextProvider"
import { loginUser } from "../../../utils/api/api"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"

export interface LoginProps {
    email: string
    password: string
    remember: boolean
}

/**
 * Login Page for the User Frontend. It can switch to be the Signup Page.
 */
export default function UserLogin() {
    const navigate = useNavigate()
    const { setUser } = useStateContext()
    const [signUp, setSignUp] = useState(false)

    function login(email: string, password: string, remember: boolean) {
        loginUser({
            email: email,
            password: password,
            remember
        })
            .then((response) => {
                setUser(response.data)
                navigate(-1)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <div
            className={[styles.wrap].join(" ")}
            style={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "32px 0"
            }}
        >
            <img
                className={[styles.logo].join(" ")}
                src={howhyLogo}
                alt={"logo"}
            ></img>
            {signUp ? (
                <RegisterForm
                    loginFn={login}
                    signUpToggle={() => setSignUp(false)}
                />
            ) : (
                <LoginForm
                    loginFn={login}
                    signUpToggle={() => setSignUp(true)}
                />
            )}
        </div>
    )
}

export interface LoginFormProps {
    loginFn: (email: string, password: string, remember: boolean) => void
    signUpToggle: () => void
}
