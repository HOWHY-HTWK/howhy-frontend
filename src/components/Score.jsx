import React, { useEffect, useRef, useState } from 'react'
import './css/score.css'
import { ReactComponent as Logo } from '../assets/howhy_solid.svg'


export default function Score({newscore}) {
    
    const [score, setscore] = useState(0)  
    
    useEffect(() => {
        countup(score, newscore)
    }, [newscore])
    
    return (
        <div className='scoreWrap'>
            <Logo className='scoreLogo'></Logo>
            <div className='scoreCounter'>{score}</div>
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
