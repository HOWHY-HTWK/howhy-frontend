import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { ContextProvider } from "./contexts/ContextProvider"
import Loader from "../src/pages/shared/components/Loader"
import Router from "./Router"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ContextProvider>
            <Suspense fallback={<Loader></Loader>}>
                <Router></Router>
            </Suspense>
        </ContextProvider>
    </React.StrictMode>
)
