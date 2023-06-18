import React, { useEffect, useState } from 'react'
import styles from './css/Ranking.module.css'
import UserHeader from './UserHeader'
import { ranking } from '../api'

export default function Ranking() {
    const [rankingList, setRankingList] = useState([]);

    const items = rankingList.map((item, index) => {
        return (
            <div key={index} className={[styles.listItem].join(' ')} >
                <div>{item.name}</div>
                <div>{item.score}</div>
            </div>
        )
    })

    useEffect(() => {
        getRankingData()
    }, [])

    function getRankingData() {
        ranking().then(response => {
            setRankingList(response.data)
        }).catch(error => {

        })
    }

    return (
        <div className={[styles.list].join(' ')} >
            <div className={[styles.title].join(' ')} >Top 5 HOWHY Users:</div>
            {items}
        </div>
    )
}
