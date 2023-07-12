import React, { useEffect, useRef, useState } from 'react'
import styles from './DropDown.module.css'
import { useStateContext } from 'src/contexts/ContextProvider'
import { Link } from 'react-router-dom'
import { MdArrowDropDown } from "react-icons/md";
import * as utils from 'src/utils/utils'

/**
 * Return the Dropdown Menu in the Header. Event Listeners are added to close the menu on every 
 * click outsite of the menue.
 * @returns 
 */
export default function DropDown() {
    const { user, authenticated, setUser } = useStateContext()
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    function handleUserClick() {
        setIsOpen(!isOpen)
    }

    return (
        <div className={[styles.user].join(' ')} ref={dropdownRef} onClick={handleUserClick}>
            <div className={[styles.name].join(' ')} >Hallo {user.name} <MdArrowDropDown></MdArrowDropDown></div>
            <div className={[styles.dropDownWrapper, (isOpen ? styles.visible : null)].join(' ')}>
                <div className={[styles.wrap, "itemBackground"].join(' ')} >
                    <Link to={'/editor/settings'} className={`${styles.menuListItem}`}>Einstellungen</Link>
                    <Link to={'/editor/prizes'} className={`${styles.menuListItem}`}>Preise</Link>
                    <Link to={'/editor/stats'} className={`${styles.menuListItem}`}>Statistiken</Link>
                    <div className={styles.menuListItem} onClick={() => utils.logout(setUser)}>Log Out</div>
                </div>
            </div>
        </div>
    )
}
