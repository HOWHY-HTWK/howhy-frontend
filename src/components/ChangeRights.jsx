import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import emailStyles from './css/AddEmail.module.css'
import styles from './css/ChangeRights.module.css'
import { getEmails, postEmail } from '../api';
import * as api from '../api';
import { useStateContext } from '../contexts/ContextProvider';

export default function ChangeRights() {
    const { user, setUser } = useStateContext()
    const [users, setUsers] = useState([])

    const userList = users.map(element => {
        return (
            <tr key={element.id} className={[styles.tableRow].join(' ')} >
                <td className={[].join(' ')} >{element.email}</td>
                <td>{element.name}</td>
                <td>{element.score}</td>
                <td>{element.role}</td>
                <td>
                    {user.role == 'admin' ?
                        <button className={[emailStyles.smallButton, emailStyles.makeAdmin].join(' ')}
                            onClick={() => giveEditorRights(element.id)}>Bearbeiten Rechte geben</button>
                        :
                        null}
                </td>

            </tr>
        )
    })

    useEffect(() => {
        getUsers()
    }, [])

    function getUsers() {
        api.getUsers()
            .then(response => {
                console.log(response.data)
                setUsers(response.data)
            }).catch(error => {
                console.log(error.response)
                alert(error.response.message)
            })
    }

    function giveEditorRights(id) {
        api.giveEditorRights(id)
            .then(response => {
                console.log(response.data)
                getUsers()
            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <div className={[emailStyles.wrap, styles.wrap].join(' ')} >
            <h4 className={emailStyles.title}>Alle Nutzer ({users.length})</h4>
            <table className={[styles.listItem].join(' ')} >
                <tr>
                    <th>E-Mail</th>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Role</th>
                    <th>Change Rights</th>
                </tr>
                {userList}
            </table>
            {user.role == 'admin' ?
                <div className={[emailStyles.inputWrapper].join(' ')} >

                </div> : <div style={{ color: 'red' }}>Sie bestizen nicht die Rechte<br /> um die Emails zu bearbeiten.</div>}
        </div>
    )
}
