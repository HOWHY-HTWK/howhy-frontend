import { Box } from "@mui/material"
import React, { FormEvent, useState } from "react"
import { LoginFormProps } from "./UserLogin"
import {
    HowhyButton,
    HowhyOutlinedButton
} from "../components/HowhyButton.styled"
import { HowhyTextField } from "../components/HowhyTextField"
import { PasswordFormField } from "./components/PasswordFormField"

export const LoginForm = ({ loginFn, signUpToggle }: LoginFormProps) => {
    const [errors, setErrors] = useState({})
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const [remember, setRemember] = useState(true)

    function validate() {
        setErrors({
            email: loginData.email.length <= 0 ? "Bitte Email eingeben." : null,
            password:
                loginData.password.length <= 0
                    ? "Bitte Passwort eingeben."
                    : null
        })

        return !(errors["email"] != null || errors["password"] != null)
    }

    function handleLogin(event?: FormEvent) {
        const isOk = validate()
        if (!isOk) {
            return
        }

        event.preventDefault()

        loginFn(loginData.email, loginData.password, remember)
    }

    return (
        <Box
            sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <Box height={28}></Box>
            <HowhyTextField
                label="E-Mail-Adresse"
                error={errors["email"]}
                placeholder={"Gib deine E-Mail-Adresse ein."}
                onChange={(event) =>
                    setLoginData({ ...loginData, email: event.target.value })
                }
            />
            <Box height={28} />
            <PasswordFormField
                label="Passwort"
                error={errors["password"]}
                placeholder={"Gib dein Passwort ein."}
                onChange={(event) =>
                    setLoginData({ ...loginData, password: event.target.value })
                }
            />
            <Box width={"40%"} paddingTop={"24px"}>
                <HowhyButton
                    fullWidth
                    variant={"contained"}
                    onClick={handleLogin}
                >
                    Einloggen
                </HowhyButton>
                <Box height={12}></Box>
                <HowhyOutlinedButton
                    fullWidth
                    variant={"outlined"}
                    onClick={signUpToggle}
                >
                    Registrieren
                </HowhyOutlinedButton>
            </Box>
        </Box>
    )
}
