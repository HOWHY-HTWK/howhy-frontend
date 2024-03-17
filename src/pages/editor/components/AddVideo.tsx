import React, { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./AddVideo.module.css"

/**
 * Show a Component on wich a VideoId can be entered and Videos can be added to the Database
 * with a button Click. The Button links to the Page where Videos are edited with the videoid
 * in the url.
 */
export default function AddVideo(props) {
    const [input, setInput] = useState(props?.value ?? "")

    return (
        <div className={["center", "listElement", styles.advidWrap].join(" ")}>
            <h3 style={{ margin: 0 }}>Video per Id Hinzugügen</h3>
            <div className="FlexRow">
                <div>Bitte Video-ID eingeben:</div>
                <input
                    value={input}
                    onInput={(e) => setInput(e.currentTarget.value)}
                />
            </div>
            <Link className="button" to={`/editor/edit/${input}`}>
                Open Video
            </Link>
        </div>
    )
}
