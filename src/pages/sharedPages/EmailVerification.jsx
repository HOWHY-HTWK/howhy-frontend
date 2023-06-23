import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { verifyEmail } from 'src/utils/api/api';
import { useStateContext } from 'src/contexts/ContextProvider';
import LogInComponent from 'src/pages/editor/login/LogInComponent';
import styles from './EmailVerification.module.css'

export default function EmailVerification() {
    const { id, hash } = useParams();
    const queryParameters = new URLSearchParams(window.location.search)
    const expires = queryParameters.get('expires');
    const signature = queryParameters.get('signature');

    const currentPath = useLocation().pathname;

    const { user, setUser } = useStateContext()
    const [message, setMessage] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        tryVerification()
    }, [user])

    function tryVerification() {
        console.log('try')
        verifyEmail(id, hash, expires, signature).then(response => {
            setMessage("Email erfolgreich verifiziert! Sie Können diese Seite jetzt schließen.")
        }).catch(error => {
            console.log(error)
            setMessage(error.response.data.message)
        })
    }

    return (
        user ?
            <div className={[styles.text].join(' ')} >{message}</div >
            :
            <div className={['centerVertical'].join(' ')} >
                <p className={[styles.text].join(' ')} >Bitte Loggen sie sich ein um ihre Email Adresse zu verifizieren.</p>
                <LogInComponent></LogInComponent>
            </div>
    )
}