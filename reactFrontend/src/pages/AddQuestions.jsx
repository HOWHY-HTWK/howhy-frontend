import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useSanctum } from 'react-sanctum';

export default function AddQuestions(props) {
  const { authenticated, user, signIn } = useSanctum();
  const [input, setInput] = useState(props?.value ?? '');

  if (authenticated === true) {
    return (
      <>
        <div>Input Video Id:</div>
        <input value={input} onInput={e => setInput(e.target.value)} />
        <Link className='button' to={`/edit/?id=${input}`}>Open Video</Link>
      </>
    )
  } else {
    <>error</>
  }
}
