import React from 'react'
import styles from './WinningAnimation.module.css'
import bulb from 'src/assets/howhy_solid.svg'

/**
 * Displays an Animation of lightbulbs flying from the center of the app to the top right corner, where the 
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
                    animationDelay: (index / 10) + 's',
                    "--translate-x": ((Math.random() * 15) - 7.5) + 'vw',
                    "--translate-y": ((Math.random() * 15) - 7.5) + 'vh',
                }}
                className={[styles.bulb, styles.winningAnimation].join(' ')}
                src={bulb} >

            </img >
        )
    })
    return bulbs
}
