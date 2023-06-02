import React from 'react'
import { useParams } from 'react-router-dom'

export default function QrCheck() {
    const code = useParams().code;
    return (
        <div>{code}</div>
    )
}

