import React, { useEffect, useRef, useState } from 'react'
import styles from './css/Score.module.css'
import { ReactComponent as Logo } from '../assets/howhy_solid.svg'
import { useStateContext } from '../contexts/ContextProvider'
import WinningAnimation from './WinningAnimation'


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
        <div className={[styles.scoreWrap].join(' ')} >
            {animation ? <WinningAnimation></WinningAnimation> : null}
            <div className={[styles.level].join(' ')} >LV 2</div>
            <div className={[styles.divider].join(' ')} ></div>
            <div className={[styles.scoreCounter].join(' ')} >{score} Pt.</div>
        </div>
    )
}
