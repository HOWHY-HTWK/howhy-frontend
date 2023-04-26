import React, { useEffect, useRef, useState } from 'react'
import styles from './css/Score.module.css'
import { ReactComponent as Logo } from '../assets/howhy_solid.svg'


export default function Score({newscore}) {
    
    const scoreRef = useRef(0)
    const [score, setscore] = useState(0)
    
    useEffect(() => {
        scoreRef.current = newscore
        setscore(newscore)
    }, [])
    
    useEffect(() => {
        countup(scoreRef.current, newscore)
    }, [newscore])
    
    return (
        <div className={[styles.scoreWrap].join(' ')} >
            <Logo className={[styles.scoreLogo].join(' ')} ></Logo>
            <div className={[styles.scoreCounter].join(' ')} >{score}</div>
        </div>
    )

    function countup(oldscore, newscore){
        if(oldscore < newscore){
            oldscore += 1
            setscore(oldscore)
            setTimeout(() => {
                countup(oldscore, newscore)
            }, (newscore-oldscore)/10);
        } else{
            return;
        }
    }
}
