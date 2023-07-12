import React, { useState } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

export default function Statistics() {
    const [data, setData] = useState([{ key: 1 }, { key: 2 }, { key: 3 }])
    return (
        <div>
            <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey="key" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" ></CartesianGrid>
                <XAxis></XAxis>
                <YAxis></YAxis>
            </LineChart>
        </div>
    )
}
