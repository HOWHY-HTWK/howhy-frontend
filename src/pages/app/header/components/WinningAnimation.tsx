import React from "react"
import styles from "./WinningAnimation.module.css"
import bulb from "src/assets/howhy_solid.svg"

/**
 * Displays an Animation of light bulbs flying from the center of the app to the top right corner, where the
 * Score is located.
 */
export default function WinningAnimation() {
    let array = Array.from({ length: 10 })
    let bulbs = array.map((element, index) => {
        return (
            /** The css variables translate-x translate-y are set programatically to make the lightbulbs
             * spawn in every direction. Those css variables are used by the css Animation.
             */
            <img
                key={index}
                style={{
                    animationDelay: index / 10 + "s",
                    transform: `translate(${Math.random() * 15 - 7.5}vw, ${
                        Math.random() * 15 - 7.5
                    }vh)`
                }}
                className={[styles.bulb, styles.winningAnimation].join(" ")}
                src={bulb}
            ></img>
        )
    })
    return bulbs
}
