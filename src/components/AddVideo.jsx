import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import styles from './css/AddVideo.module.css'

export default function AddVideo(props) {
  const [input, setInput] = useState(props?.value ?? '');

  return (
    <div className={['center', 'listElement', styles.advidWrap].join(' ')} >
      <h3 style={{margin: 0}}>Video per Id Hinzugügen</h3>
      <div className='FlexRow'>
        <div>Bitte Video-ID eingeben:</div>
        <input value={input} onInput={e => setInput(e.target.value)} />
      </div>
      <Link className='button' to={`/edit/?id=${input}`}>Open Video</Link>
    </div>
  )
}
