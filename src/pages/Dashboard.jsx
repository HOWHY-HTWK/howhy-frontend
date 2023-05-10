import React, { useEffect, useReducer, useRef, useState } from 'react'
import DashList from '../components/DashList';
import Score from '../components/Score';
import * as api from '../api';
import { useStateContext } from '../contexts/ContextProvider';
import styles from './css/Dashboard.module.css';

export default function Dashboard() {
    const { user, authenticated, setUser } = useStateContext()
    const [score, setscore] = useState(null)

    useEffect(() => {
        api.score().then(response => {
            setscore(response.data.score)
        })
    }, [])

    return (
        <div className={[styles.wrap].join(' ')} >
            {score != null && user ? <Score newscore={score}></Score> : null}
            <DashList></DashList>
        </div>
    );
}
