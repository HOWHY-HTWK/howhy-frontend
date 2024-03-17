import React, { useState } from "react"
import styles from "./Dashboard.module.css"
import Home from "../home/Home"
import { VideoList } from "../videolist/VideoList"
import Prizes from "../prizes/Prizes"
import { Box, Tab, Tabs } from "@mui/material"

/**
 * The wrapper for the Tabed View on the Startpage of the User Frontend. All Pages in the Tabs
 * are loaded and hidden according to wich Tab is selected to make the changes between Tabs quick.
 */
export default function Dashboard() {
    const [page, setPage] = useState(1)

    return (
        <div className={[styles.wrap].join(" ")}>
            <Tabs
                value={page}
                onChange={(event, selectedPage) => {
                    setPage(selectedPage)
                }}
                centered
            >
                <Tab label="Home" />
                <Tab label="Videos" />
                <Tab label="Preise" />
            </Tabs>
            <TabPanel currentPage={page} index={0}>
                <Home />
            </TabPanel>
            <TabPanel currentPage={page} index={1}>
                <VideoList />
            </TabPanel>
            <TabPanel currentPage={page} index={2}>
                <Prizes />
            </TabPanel>
        </div>
    )
}

interface TabPanelProps {
    currentPage: number
    index: number
    children?: React.ReactNode
}

const TabPanel = ({ currentPage, index, children }: TabPanelProps) => {
    return (
        <div hidden={currentPage !== index}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                {children}
            </Box>
        </div>
    )
}
