import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';

export default function AddQuestions(props) {
  const [input, setInput] = useState(props?.value ?? '');

    return (
      <>
        <div>Input Video Id:</div>
        <input value={input} onInput={e => setInput(e.target.value)} />
        <Link className='button' to={`/edit/?id=${input}`}>Open Video</Link>
      </>
    )
}
