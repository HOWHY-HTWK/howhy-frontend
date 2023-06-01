import React, { Suspense } from 'react'

import Dashboard from './pages/Dashboard';
import EditorDash from './pages/EditorDash';
import WatchVideo from './pages/WatchVideo';
import Settings from './pages/Settings';
import Redirect from './pages/Redirect';
import UserPage from './pages/UserPage';
import UserSettings from './pages/UserSettings';
import User from './pages/User';
import Privacy from './pages/Privacy';
import Imprint from './pages/Imprint';
import Search from './pages/Search';
import QrCheck from './pages/QrCheck';
import Loader from './components/Loader';
import App from './App'
import EditQuestions from './pages/EditQuestions';
import Editor from './pages/Editor';
import Help from './pages/Help';
import Feedback from './pages/Feedback';
import LogIn from './components/LogIn';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
const UserLogin = React.lazy(() => import('./components/UserLogin'));

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    index: true,
                    element: <Dashboard />
                },
                {
                    path: "/watch/:videoId",
                    element: <WatchVideo />
                },
                {
                    path: "/search",
                    element: <Search />
                },
                {
                    path: "/user",
                    element: <User />,
                    children: [
                        {
                            index: true,
                            element: <UserPage />
                        },
                        {
                            path: "/user/settings",
                            element: <UserSettings />
                        },
                        {
                            path: "/user/help",
                            element: <Help></Help>
                        },
                        {
                            path: "/user/feedback",
                            element: <Feedback></Feedback>
                        },
                        {
                            path: "/user/privacy",
                            element: <Privacy></Privacy>
                        },
                        {
                            path: "/user/imprint",
                            element: <Imprint></Imprint>
                        }
                    ]
                }
            ]
        },
        {
            path: "/editor",
            element: <Editor />,
            children: [
                {
                    index: true,
                    element: <EditorDash />
                },
                {
                    path: "/editor/edit/:videoId",
                    element: <EditQuestions />
                },
                {
                    path: "/editor/settings",
                    element: <Settings />
                }
            ]
        },
        {
            path: "/login",
            element: <LogIn></LogIn>
        },
        {
            path: "/userlogin",
            element: <Suspense fallback={<Loader />}><UserLogin /></Suspense>
        },
        {
            path: "/redirect",
            element: <Redirect></Redirect>
        },
        {
            path: "/qr/:code",
            element: <QrCheck></QrCheck>,
        }
    ],
    {
        basename: `${import.meta.env.BASE_URL}`,
    }
);

export default function Router() {
    return (
        <RouterProvider router={router} />
    )
}
