import React, { useRef } from 'react'
import styles from './ProgressWidget.module.css'
import bigBulb from 'src/assets/leftBulb.svg'
import rightGraphic from 'src/assets/rightGraphic.svg'
import { useStateContext } from 'src/contexts/ContextProvider'
import { getLevel, levels } from 'src/utils/utils'

export default function ProgressWidget() {
    const { user, setUser } = useStateContext()

    const level = parseInt(getLevel(user.score));
    // const level = 5

    function nextLevelComponent(level, points, margin, scale) {
        return (
            <div style={{ 'marginLeft': margin + 'px', 'scale': `${scale}`, 'opacity': `${scale}` }} className={['center', styles.nextLevelWrap].join(' ')} >
                <div className={[styles.nextLevel].join(' ')} >
                    <div>{level}</div>
                </div>
                <div className={[styles.nextLevelPoints].join(' ')} >{points} Pt.</div>
            </div>
        )
    }

    function getPoints(level) {
        return levels[level - 2]
    }

    function getNextLevels() {
        let nextLevels = []

        for (let i = 0; i < 3; i++) {
            let offset = i + 1
            if (getPoints(level + offset)) {
                nextLevels.push(nextLevelComponent(level + offset, getPoints(level + offset), i * 20, 1 / ((i + 1) ** 0.5)))
            }
        }

        if (nextLevels.length == 0) {
            return (
                <div className={[styles.nextLevels].join(' ')} >
                    <div className={[styles.maxLevel].join(' ')} >Du hast das maximale Level erreicht!</div>
                </div>
            )
        }

        return (
            <div className={[styles.nextLevels].join(' ')} >
                {nextLevels}
            </div>
        )
    }

    return (
        <div className={[styles.background].join(' ')} >
            <img className={[styles.rightGraphic].join(' ')} src={rightGraphic}></img>
            <img className={[styles.bigBulb].join(' ')} src={bigBulb}></img>
            <div className={[styles.level].join(' ')} >Lv {level}</div>
            {getNextLevels()}
        </div>
    )
}
