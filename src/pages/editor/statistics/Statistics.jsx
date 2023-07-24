import React, { useEffect, useRef, useState } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { getUsage } from 'src/utils/api/api'
import { dateTimeToUnixTime } from 'src/utils/utils'

export default function Statistics() {
    // const [data, setData] = useState(null)
    // const goodData = useRef();

    // useEffect(() => {
    //     getUsage().then(response => {
    //         console.log(response.data)
    //         setData(response.data)
    //     })
    // }, [])

    // useEffect(() => {
    //     let unixTimeStamps = data ? data.map(item => {
    //         console.log('map')
    //         return dateTimeToUnixTime(item.created_at)
    //     }) : []

    //     let currentUnixTimestampMs = Date.now();
    //     let currentUnixTimestampSec = Math.floor(currentUnixTimestampMs / 1000);

    //     goodData.current = unixTimeStamps;
    // }, [data])


    return (
        <div>
            <div className={['center'].join(' ')} >Coming soon.</div>
            {/* <LineChart width={400} height={400} data={goodData.current}>
                <Line type="monotone" dataKey="key" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" ></CartesianGrid>
                <XAxis></XAxis>
                <YAxis></YAxis>
            </LineChart> */}
        </div>
    )
}
