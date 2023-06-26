import React, { useState } from 'react'
import SearchBar from 'src/pages/app/search/SearchBar'
import styles from './Search.module.css'
import back from 'src/assets/icons/back.svg'
import { useNavigate } from 'react-router-dom'
import DashList from 'src/pages/app/videolist/DashList';

/**
 * Displays the same Videolist as the videos tab but the list gets filtered for the searchterm. 
 * @returns 
 */
export default function Search() {
    const navigate = useNavigate()

    const [term, setTerm] = useState('')
    console.log(term)

    return (
        <div className={[styles.wrap].join(' ')} >
            <div className={[styles.topWrap].join(' ')} >
                <img className={[styles.back].join(' ')} src={back} onClick={() => navigate(-1)}></img>
                <div className={[styles.barWrap].join(' ')} >
                    <SearchBar setSearchTerm={setTerm}></SearchBar>
                </div>
            </div>
            {term && term != '' ? <DashList searchterm={term}></DashList> : null}
        </div>
    )
}
