import React from 'react'
import styles from './css/Redirect.module.css'

export default function Redirect() {
  const queryParameters = new URLSearchParams(window.location.search)
  const verified = queryParameters.get("verified")

  return (
    <div className={[styles.wrap].join(' ')} >
      {verified == 1 ?
        <div>Email erfolgreich verifiziert!</div>
        :
        <div>Fehler</div>}
    </div>
  )
}
