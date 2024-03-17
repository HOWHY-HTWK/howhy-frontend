import React from "react"
import styles from "./ProgressWidget.module.css"
import bigBulb from "../../../../assets/leftBulb.svg"
import rightGraphic from "../../../../assets/rightGraphic.svg"
import { getLevel, levels } from "../../../../utils/utils"
import { useStateContext } from "../../../../contexts/ContextProvider"

/**
 * Shows the current Level and the upcoming ones in i stylized way
 */
export const ProgressWidget = () => {
    const { user, setUser } = useStateContext()

    const level = parseInt(getLevel(user.score))

    function nextLevelComponent(
        level: number,
        points: number,
        margin: number,
        scale: number
    ) {
        return (
            <div
                style={{
                    marginLeft: margin + "px",
                    scale: `${scale}`,
                    opacity: `${scale}`
                }}
                className={["center", styles.nextLevelWrap].join(" ")}
            >
                <div className={[styles.nextLevel].join(" ")}>
                    <div>{level}</div>
                </div>
                <div className={[styles.nextLevelPoints].join(" ")}>
                    {points} Pt.
                </div>
            </div>
        )
    }

    function getPoints(level: number) {
        return levels[level - 2]
    }

    function getNextLevels() {
        let nextLevels = []

        for (let i = 0; i < 3; i++) {
            let offset = i + 1
            if (getPoints(level + offset)) {
                nextLevels.push(
                    nextLevelComponent(
                        level + offset,
                        getPoints(level + offset),
                        i * 20,
                        1 / (i + 1) ** 0.5
                    )
                )
            }
        }

        if (nextLevels.length == 0) {
            return (
                <div className={[styles.nextLevels].join(" ")}>
                    <div className={[styles.maxLevel].join(" ")}>
                        Du hast das maximale Level erreicht!
                    </div>
                </div>
            )
        }

        return <div className={[styles.nextLevels].join(" ")}>{nextLevels}</div>
    }

    return (
        <div className={[styles.background].join(" ")}>
            <img
                className={[styles.rightGraphic].join(" ")}
                src={rightGraphic}
            ></img>
            <img className={[styles.bigBulb].join(" ")} src={bigBulb}></img>
            <div className={[styles.level].join(" ")}>Lv {level}</div>
            {getNextLevels()}
        </div>
    )
}
