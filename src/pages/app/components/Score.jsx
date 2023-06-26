import React, { useEffect, useRef, useState } from 'react'
import styles from './Score.module.css'
import { useStateContext } from 'src/contexts/ContextProvider'
import WinningAnimation from './WinningAnimation'
import { getLevel } from 'src/utils/utils'

/**
 * This Component detects when the Score of the User changes and displays an 
 * Animation of flying lightbulbs and a counting up Score.
 * 
 * @returns ScoreHtml
 */

export default function Score({ }) {
    const { user, setUser } = useStateContext()

    const oldScoreRef = useRef(0)
    const loggedInBefore = useRef(false)
    const [score, setscore] = useState(0)
    const [animation, setAnimation] = useState(false)

    useEffect(() => {
        if (user) {
            if (loggedInBefore.current) {
                showAnimation(oldScoreRef.current, user.score);
            } else {
                setscore(user.score)
            }
            loggedInBefore.current = true
            oldScoreRef.current = user.score
        } else {
            loggedInBefore.current = false
        }
    }, [user])

    function countup(oldscore, newscore) {
        if (oldscore < newscore) {
            oldscore += 1
            setscore(oldscore)
            setTimeout(() => {
                countup(oldscore, newscore)
            }, (newscore - oldscore) / 10);
        } else {
            return;
        }
    }

    function showAnimation(oldscore, newscore) {
        if (newscore - oldscore != 0) {
            setAnimation(true);
            setTimeout(() => {
                countup(oldscore, newscore)
            }, 1000);
            setTimeout(() => {
                setAnimation(false)
            }, 3000);
        }
    }

    return (
        <div className={[styles.scoreWrap, user ? null : styles.filter].join(' ')} >
            {animation ? <WinningAnimation></WinningAnimation> : null}
            <div className={[styles.level].join(' ')} >LV {getLevel(score)}</div>
            <div className={[styles.divider].join(' ')} ></div>
            <div className={[styles.scoreCounter].join(' ')} >{score} Pt.</div>
        </div>
    )
}
