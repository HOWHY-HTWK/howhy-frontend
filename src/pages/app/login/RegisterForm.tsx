import React, { useEffect, useRef, useState } from "react"
import styles from "./UserLogin.module.css"
import { Link } from "react-router-dom"
import { LoginFormProps } from "./UserLogin"
import { registerUser } from "../../../utils/api/api"
import { HowhyTextField } from "../components/HowhyTextField"
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material"
import { HowhyButton, HowhyOutlinedButton } from "../components/HowhyButton.styled"
import { PasswordFormField } from "./components/PasswordFormField"

/**
 * Signup Page for the User Frontend. It is Displayed on the userlogin Page
 */

export interface RegisterUserProps {
    name: string
    email: string
    password: string
    password_confirmation: string
    editor: boolean
}

export const RegisterForm = ({ loginFn, signUpToggle }: LoginFormProps) => {
    const [message, setMessage] = useState(null)
    const [info, setInfo] = useState(false)
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
        editorRights: false,
        accept: false,
        password_confirmation: ""
    })
    const [error, setError] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        accept: ""
    })

    const infoRef = useRef<HTMLSpanElement>()

    useEffect(() => {
        //set random username initially
        setRegisterData({ ...registerData, name: generateRandomUsername(6) })

        const handleOutsideClick = (event) => {
            if (!infoRef.current.contains(event.target)) {
                setInfo(false)
            }
        }
        document.addEventListener("click", handleOutsideClick)
        return () => {
            document.removeEventListener("click", handleOutsideClick)
        }
    }, [])

    function verifyInput() {
        let error = {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            accept: ""
        }
        if (registerData.name.length <= 0) {
            error.name = "Bitte Benutzernamen eingeben."
        }
        if (registerData.email.length <= 0) {
            error.email = "Bitte Email eingeben."
        }
        if (registerData.password.length <= 0) {
            error.password = "Bitte Passwort eingeben."
        }
        if (registerData.password_confirmation.length <= 0) {
            error.password_confirmation = "Bitte Passwort wiederholen."
        } else if (
            registerData.password != registerData.password_confirmation
        ) {
            error.password_confirmation = "Passwörter stimmen nicht überein."
        }
        if (!registerData.accept) {
            error.accept = "Bitte Datenschutzbestimmungen akzeptieren."
        }

        setError(error)

        console.log(error)

        return !(
            error.name != "" ||
            error.email != "" ||
            error.password != "" ||
            error.password_confirmation != "" ||
            error.accept != ""
        )
    }

    async function handleSignup() {
        const isOk = verifyInput()
        if (isOk && registerData.accept) {
            const registerUserProps: RegisterUserProps = {
                name: registerData.name,
                email: registerData.email,
                password: registerData.password,
                password_confirmation: registerData.repeatPassword,
                editor: registerData.editorRights
            }
            registerUser(registerUserProps)
                .then(() => {
                    loginFn(registerData.email, registerData.password, true)
                })
                .catch((error) => {
                    setMessage(
                        <span style={{ color: "red" }}>
                            {error.response.data.message}
                        </span>
                    )
                })
        } else {
            setMessage("Sie müssen den Datenschutzbestimmungen zustimmen.")
        }
    }

    function handleInfoClick() {
        setInfo((prev) => !prev)
    }

    return (
        <div
            style={{ width: "50%" }}
            className={[styles.formwrapper].join(" ")}
        >
            <form method="post" className={[styles.form].join(" ")}>
                <Box width="100%">
                    <div className={[styles.labelText].join(" ")}>
                        Benutzername
                        <span
                            ref={infoRef}
                            className={[styles.info].join(" ")}
                            onClick={handleInfoClick}
                        >
                            &#9432; {getUserNameInfo(info)}
                        </span>
                    </div>
                    <HowhyTextField
                        required
                        error={error.name}
                        label={""}
                        placeholder={"Gib deinen Benutzernamen ein."}
                        onChange={(e) =>
                            setRegisterData({
                                ...registerData,
                                name: e.currentTarget.value
                            })
                        }
                        value={registerData.name}
                    />
                </Box>
                <HowhyTextField
                    required
                    error={error.email}
                    label={"E-Mail"}
                    placeholder={"Gib deine E-Mail ein."}
                    onChange={(e) =>
                        setRegisterData({
                            ...registerData,
                            email: e.currentTarget.value
                        })
                    }
                    type={"email"}
                />
                <PasswordFormField
                    error={error.password}
                    label={"Passwort"}
                    placeholder={"Gib ein Passwort ein."}
                    onChange={(e) =>
                        setRegisterData({
                            ...registerData,
                            password: e.currentTarget.value
                        })
                    }
                />
                <PasswordFormField
                    error={error.password_confirmation}
                    label={"Passwort wiederholen"}
                    placeholder={"Wiederhole dein Passwort."}
                    onChange={(e) =>
                        setRegisterData({
                            ...registerData,
                            password_confirmation: e.currentTarget.value
                        })
                    }
                />
                <div className={[styles.label].join(" ")}>
                    <div
                        className={[
                            styles.message,
                            registerData.password ==
                            registerData.password_confirmation
                                ? styles.hidden
                                : null
                        ].join(" ")}
                    >
                        Die Passwörter stimmen nicht überein.
                    </div>
                    <div className={["center", styles.privacy].join(" ")}>
                        <FormControlLabel
                            style={{ alignItems: "start" }}
                            control={
                                <Checkbox
                                    onChange={(e) =>
                                        setRegisterData({
                                            ...registerData,
                                            accept: e.target.checked
                                        })
                                    }
                                    size={"small"}
                                    style={{
                                        paddingTop: "1px",
                                        paddingRight: "9px",
                                        color:
                                            error.accept.length > 0
                                                ? "red"
                                                : "grey"
                                    }}
                                />
                            }
                            label={
                                <Typography fontSize={"small"}>
                                    Ich habe die{" "}
                                    <Link to="/user/privacy">
                                        Datenschutzbestimmung
                                    </Link>{" "}
                                    gelesen erkläre mich damit einverstanden.
                                </Typography>
                            }
                        />
                    </div>
                    {message != null ? (
                        <div className={[styles.message].join(" ")}>
                            {message}{" "}
                        </div>
                    ) : (
                        <div
                            className={[styles.message, styles.invisible].join(
                                " "
                            )}
                        >
                            E
                        </div>
                    )}
                </div>
            </form>
            <Box width="50%">
                <HowhyButton
                    fullWidth
                    variant={"contained"}
                    onClick={handleSignup}
                >
                    Registrieren
                </HowhyButton>
                <Box height={"8px"}></Box>
                <HowhyOutlinedButton
                    fullWidth
                    variant={"outlined"}
                    onClick={signUpToggle}
                >
                    Einloggen
                </HowhyOutlinedButton>
            </Box>
        </div>
    )
}

function generateRandomUsername(length: number) {
    let result = ""
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    for (let counter = 0; counter < length; counter++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        )
    }
    return result
}

function getUserNameInfo(info: boolean) {
    return (
        <div
            style={{ zIndex: 10 }}
            className={[styles.infoBox, info ? styles.visible : null].join(" ")}
        >
            Es wird automatisch ein anonymer Benutzername generiert. Dieser kann
            allerdings wie gewünscht angepasst werden.
        </div>
    )
}
