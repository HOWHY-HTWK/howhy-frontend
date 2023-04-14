import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import styles from './css/AddEmail.module.css'

export default function AddEmail() {
    const [allowedEmails, setallowedEmails] = useState([])
    const [newEmail, setNewEmail] = useState('');

    useEffect(() => {
        document.title = "Einstellungen";
    }, [])

    useEffect(() => {
        axiosClient.get('api/allowed-email')
            .then(response => {
                setallowedEmails(response.data)
            }).catch(error => {
                alert(error.response.message)
            })
    }, [])
    
  function saveNewEmail(){
    let request = {'email': newEmail}
    axiosClient.post('api/allowed-email', request )
    .then(response => {
        setallowedEmails(response.data)
    }).catch(error => {
        alert(error.response.message)
    })
  }

  function deleteEmail(id, email){
    confirm(email +' wirklich löschen?') ?
    axiosClient.delete(`api/allowed-email/${id}`)
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
                    <button className={styles.delete} onClick={() => deleteEmail(email.id, email.email)}>Löschen</button>
                    </div>
            )
        })}
    <input value={newEmail} type="email" name="email" placeholder='E-mail' onInput={e => setNewEmail(e.target.value)}></input>
    <button onClick={saveNewEmail} className='button'>Neue Email speichern</button>
    </div>
  )
}
