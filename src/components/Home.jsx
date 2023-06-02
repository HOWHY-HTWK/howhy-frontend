import React from 'react'
import Ranking from './Ranking'
import Loader from './Loader'
import { useStateContext } from '../contexts/ContextProvider'

export default function Home() {
    const { user, setUser } = useStateContext()

    return (
        <div className={['centerVertival', 'wrap'].join(' ')} >
            {user ?
                < Ranking ></Ranking >
                :
                <>Bitte melden Sie sich an um diesen Inhalt zu sehen.</>
            }
        </div>
    )
}
