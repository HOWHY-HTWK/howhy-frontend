import React, { useEffect, useState } from 'react'
import styles from './SearchBar.module.css'
import close from 'src/assets/icons/close.svg'

/**
 * The Input field for the Search Window.
 * @param {*} param0 
 * @returns 
 */
export default function SearchBar({ setSearchTerm }) {
    const [term, setTerm] = useState('')

    useEffect(() => {
        setSearchTerm(term)
    }, [term])

    return (
        <div className={[styles.wrap].join(' ')} >
            <div className={[styles.link].join(' ')}>
                <div className={['center', styles.bar].join(' ')} >
                    {/* <img className={[styles.img].join(' ')}  src={lupe}></img> */}
                    <input
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                        placeholder='Videos suchen'
                        className={[styles.input].join(' ')} ></input>
                    {/* <img src={filter}></img> */}
                    {term != '' ?
                        <img
                            className={[styles.delete].join(' ')}
                            src={close}
                            onClick={() => setTerm('')} />
                        : null}
                </div>
            </div>
        </div>
    )
}
