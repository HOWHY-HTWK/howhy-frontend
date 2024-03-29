import React, { useState } from 'react'
import styles from './UserPage.module.css'
import { useStateContext } from 'src/contexts/ContextProvider'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from 'src/utils/utils'
import { MdOutlineSave } from "react-icons/md";

import user_image_icon from 'src/assets/user_image_icon.svg'
import pencil from 'src/assets/icons/pencil.svg'
import logout_icon from 'src/assets/icons/logout.svg'
import { saveUsername } from 'src/utils/api/api'

/**
 * Contains the username that can be changed on this Page and some menu Items like settings and feedback.
 * @returns 
 */
export default function UserPage() {
    const { user, setUser } = useStateContext()
    const [name, setName] = useState(user ? user.name : '')
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    function logoutAndGoToHome() {
        logout(setUser)
        navigate('/')
    }

    function saveName() {
        let request = {
            name: name
        }
        setMessage('')
        saveUsername(request).then(response => {
            setMessage('Erfolgreich gespeichert!')
            setUser(response.data)
        }).catch(error => {
            setMessage(<span style={{ color: 'red' }}>{error.response.data.message}</span>)
        })
    }

    function comingSoon() {
        alert("Dieses Feature kommt bald.")
    }

    return (
        <div className={[styles.wrap].join(' ')} >
            <div className={['centerVertical', styles.top].join(' ')} >
                <img src={user_image_icon} onClick={comingSoon}></img>
                <div className={[styles.username].join(' ')} >
                    <input className={[styles.nameInput].join(' ')} value={name} onInput={e => setName(e.target.value)} />
                    {name == user.name ?
                        <img className={[styles.editName].join(' ')} src={pencil}></img>
                        :
                        <MdOutlineSave className={[styles.editName, styles.saveIcon].join(' ')} onClick={saveName} ></MdOutlineSave>
                    }
                </div>
                {message != '' ?
                    <div className={[styles.message].join(' ')} >{message} </div>
                    :
                    <div className={[styles.message, styles.invisible].join(' ')} ></div>
                }
                <div>
                </div>
            </div>
            <div className={[styles.buttonwrapper, 'centerVertical'].join(' ')} >
                <Link to={'/user/settings'} className={['button', styles.button].join(' ')} >Einstellungen</Link>
                <Link to={'/user/help'} className={['button', styles.button].join(' ')} >FAQ/Hilfe</Link>
                <Link to={'/user/feedback'} className={['button', styles.button].join(' ')} >Feedback</Link>
                <div className={['button', 'center', styles.button, styles.logout].join(' ')}
                    onClick={logoutAndGoToHome} >
                    <img src={logout_icon}></img>
                    &nbsp;&nbsp; Ausloggen</div>
            </div>
            <div className={[styles.bottomWrap].join(' ')} >
                <Link to={'/user/privacy'} className={[styles.link].join(' ')} >Datenschutz</Link>
                <Link to={'/user/imprint'} className={[styles.link].join(' ')} >Impressum</Link>
            </div>
        </div>
    )
}
