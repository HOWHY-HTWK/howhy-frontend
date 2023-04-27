import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import styles from './css/AddEmail.module.css'
import { getEmails, postEmail } from '../api';
import * as api from '../api';
import { useStateContext } from '../contexts/ContextProvider';

export default function AddEmail() {
    const { user, setUser } = useStateContext()

    const [allowedEmails, setallowedEmails] = useState([])
    const [newEmail, setNewEmail] = useState('');

    useEffect(() => {
        document.title = "Einstellungen";
    }, [])

    useEffect(() => {
        getEmails()
            .then(response => {
                setallowedEmails(response.data)
            }).catch(error => {
                console.log(error.response)
                alert(error.response)
            })
    }, [])

    function saveNewEmail() {
        let request = { 'email': newEmail }
        postEmail(request)
            .then(response => {
                setallowedEmails(response.data)
            }).catch(error => {
                alert(error.response.message)
            })
    }

    function deleteEmail(id, email) {
        confirm(email + ' wirklich löschen?') ?
            api.deleteEmail(id)
                .then(response => {
                    setallowedEmails(response.data)
                }).catch(error => {
                    alert(error.response.message)
                })
            :
            null
    }

    return (
        <div className={styles.wrap}>
            <h4 className={styles.title}>Erlaubte Emails</h4>
            {allowedEmails.map(email => {
                return (
                    <div key={email.id} className={styles.email}>
                        {email.email}
                        {user.role == 'admin' ? <button className={styles.delete} onClick={() => deleteEmail(email.id, email.email)}>Löschen</button> : null}
                    </div>
                )
            })}
            {user.role == 'admin' ?
            <div className={[styles.inputWrapper].join(' ')} >
                <input value={newEmail} type="email" name="email" placeholder='E-mail' onInput={e => setNewEmail(e.target.value)}></input>
                 <button onClick={saveNewEmail} className='button'>Neue Email speichern</button>
            </div> : <div style={{color: 'red'}}>Sie bestizen nicht die Rechte<br /> um die Emails zu bearbeiten.</div>}
        </div>
    )
}
