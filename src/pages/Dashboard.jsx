import React, { useEffect, useReducer, useRef, useState } from 'react'
import AllStoredVideosList from '../components/AllStoredVideosList';
import DashList from '../components/DashList';
import Score from '../components/Score';
import Header from '../components/Header';
import * as api from '../api';

export default function Dashboard() {

    const [score, setscore] = useState(null)

    useEffect(() => {
        api.score().then(response => {
            setscore(response.data.score)
        })
    }, [])

    return (
        <div>
            {score ? <Score newscore={score}></Score> : null}
            <DashList></DashList>
        </div>
    );
}
