import React from 'react'
import Ranking from './Ranking'
import Loader from './Loader'
import { useStateContext } from '../contexts/ContextProvider'
import ProgressWidget from './ProgressWidget'
import styles from './css/Home.module.css'

export default function Home() {
    const { user, setUser } = useStateContext()

    return (
        <div className={['centerVertical', styles.wrap].join(' ')} >
            {user ?
                <>
                    <ProgressWidget></ProgressWidget>
                    < Ranking ></Ranking >
                </>
                :
                <div className={[styles.errorMessage].join(' ')} >Bitte melde dich an um diesen Inhalt zu sehen.</div>
            }
        </div>
    )
}
