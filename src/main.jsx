import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { ContextProvider } from './contexts/ContextProvider';
import Loader from './components/Loader';
const Router = React.lazy(() => import('./Router.jsx'));

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ContextProvider>
            <Suspense fallback={<Loader></Loader>}>
                <Router></Router>
            </Suspense>
        </ContextProvider>
    </React.StrictMode>,
)
