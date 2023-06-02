import React, { useEffect, useRef, useState } from 'react'
import styles from './css/Score.module.css'
import { ReactComponent as Logo } from '../assets/howhy_solid.svg'
import { useStateContext } from '../contexts/ContextProvider'


export default function Score({ }) {
    const { user, setUser } = useStateContext()

    const scoreRef = useRef(0)
    const [score, setscore] = useState(0)

    useEffect(() => {
        if (user) {
            scoreRef.current = user.score
            setscore(user.score)
        }
    }, [])

    useEffect(() => {
        if (user) {
            countup(scoreRef.current, user.score)
            scoreRef.current = user.score
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
