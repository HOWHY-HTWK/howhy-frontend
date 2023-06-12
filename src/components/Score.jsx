import React, { useEffect, useRef, useState } from 'react'
import styles from './css/Score.module.css'
import { ReactComponent as Logo } from '../assets/howhy_solid.svg'
import { useStateContext } from '../contexts/ContextProvider'


export default function Score({ }) {
    const { user, setUser } = useStateContext()

    const oldScoreRef = useRef(0)
    const loggedInBefore = useRef(false)
    const [score, setscore] = useState(0)

    useEffect(() => {
        if (user) {
            oldScoreRef.current = user.score
        }
    }, [])

    useEffect(() => {
        if (user) {
            if (loggedInBefore.current) {
                countup(oldScoreRef.current, user.score)
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
            }, (newscore - oldscore) / 20);
        } else {
            return;
        }
    }

    return (
        <div className={[styles.scoreWrap].join(' ')} >
            <div className={[styles.level].join(' ')} >LV 2</div>
            <div className={[styles.divider].join(' ')} ></div>
            <div className={[styles.scoreCounter].join(' ')} >{score} Pt.</div>
        </div>
    )
}
