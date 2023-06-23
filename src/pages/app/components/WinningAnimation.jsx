import React from 'react'
import styles from './WinningAnimation.module.css'
import bulb from 'src/assets/howhy_solid.svg'

export default function WinningAnimation() {
    let array = Array.from({ length: 10 })
    let bulbs = array.map((element, index) => {
        return (
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
