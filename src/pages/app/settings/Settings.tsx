import React from "react"
import styles from "./Settings.module.css"
import { useNavigate } from "react-router-dom"
import { deleteUser } from "../../../utils/api/api"
import { logout } from "../../../utils/utils"
import UserSubPageLayout from "../../shared/components/UserSubPageLayout"
import { useStateContext } from "../../../contexts/ContextProvider"

export const Settings = () => {
    const navigate = useNavigate()
    const { setUser } = useStateContext()

    async function deleteRequest() {
        if (
            confirm(
                "Bist du dir sicher dass du dein Benutzerkonto unwiderruflich löschen möchtest?"
            )
        ) {
            await deleteUser()
            navigate("/")

            logout()
                .then((response) => {
                    if (response.status === 204) {
                        setUser(null)
                        window.location.reload()
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return (
        <UserSubPageLayout title={"Einstellungen"}>
            <div
                className={["button", styles.deleteButton].join(" ")}
                onClick={deleteRequest}
            >
                Konto Löschen
            </div>
        </UserSubPageLayout>
    )
}
