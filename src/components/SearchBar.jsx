import React, { useEffect, useState } from 'react'
import styles from './css/SearchBar.module.css'

import lupe from '../assets/icons/Lupe.svg'
import filter from '../assets/icons/Filter.svg'
import { Link, useSearchParams } from 'react-router-dom'

export default function SearchBar({ setSearchTerm }) {
    const [term, setTerm] = useState()

    useEffect(() => {
        setSearchTerm(term)
    }, [term])

    return (
        <div className={[styles.wrap].join(' ')} >
            <div className={[styles.link].join(' ')}>
                <div className={['center', styles.bar].join(' ')} >
                    <img className={[styles.img].join(' ')}  src={lupe}></img>
                    <input className={[styles.img].join(' ')}  value={term} onChange={e => setTerm(e.target.value)} className={[styles.input].join(' ')} ></input>
                    <img src={filter}></img>
                </div>
            </div>
        </div>
    )
}
