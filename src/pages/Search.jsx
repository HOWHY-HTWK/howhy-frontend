import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import styles from './css/Search.module.css'
import back from '../assets/icons/back.svg'
import { useNavigate } from 'react-router-dom'
import DashList from '../components/DashList';

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
