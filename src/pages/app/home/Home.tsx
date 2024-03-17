import React from "react"
import styles from "./Home.module.css"
import { useStateContext } from "../../../contexts/ContextProvider"
import { Ranking } from "./components/Ranking"
import { ProgressWidget } from "./components/ProgressWidget"

/**
 * The Home Screen of the User Frontend. It is displayed in the Tab View and contains
 * the Progress Widget and the Ranking.
 */
export default function Home() {
    const { user } = useStateContext()

    return (
        <div className={["centerVertical", styles.wrap].join(" ")}>
            {user ? (
                <>
                    <ProgressWidget></ProgressWidget>
                    <Ranking></Ranking>
                </>
            ) : (
                <div className={[styles.errorMessage].join(" ")}>
                    Bitte melde dich an um diesen Inhalt zu sehen.
                </div>
            )}
        </div>
    )
}
