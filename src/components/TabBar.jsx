import React, { useEffect, useState } from 'react'
import styles from './css/TabBar.module.css'

export default function TabBar({ setPage }) {
    const [selectedTab, setSelectedTab] = useState(1)

    useEffect(() => {
        setPage(selectedTab)
    }, [selectedTab])

    const tabs = ['Home', 'Videos', 'Preise']
    const tabObjects = tabs.map((tab, index) => {
        return (
            <div key={index} className={[styles.tab, selectedTab == index ? styles.selected : null].join(' ')} onClick={() => setSelectedTab(index)} >{tab}</div>
        )
    })

    return (
        <div className={[styles.tabs].join(' ')} >
            {tabObjects}
        </div>
    )
}
