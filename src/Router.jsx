import React, { Suspense } from 'react'

import Dashboard from './pages/app/Dashboard';
import EditorDash from './pages/editor/EditorDash';
import WatchVideo from './pages/app/watchvideo/WatchVideo';
import Settings from './pages/editor/settings/Settings';
import UserPage from './pages/app/user/UserPage';
import UserSettings from './pages/app/user/subpages/UserSettings';
import User from './pages/app/user/User';
import Privacy from './pages/sharedPages/Privacy';
import Imprint from './pages/sharedPages/Imprint';
import Search from './pages/app/search/Search';
import QrCheck from './pages/sharedPages/QrCheck';
import Loader from './sharedComponents/Loader';
import App from './pages/app/App'
import EditQuestions from './pages/editor/edit/EditQuestions';
import Editor from './pages/editor/Editor';
import Help from './pages/app/user/subpages/Help';
import Feedback from './pages/app/user/subpages/Feedback';
import LogIn from './pages/editor/login/LogIn';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ForgotPassword from './pages/sharedPages/ForgotPassword';
import ResetPassword from './pages/sharedPages/ResetPassword';
import EmailVerification from './pages/sharedPages/EmailVerification';
import AddPrizes from './pages/editor/settings/AddPrizes';
const UserLogin = React.lazy(() => import('./pages/app/login/UserLogin'));

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
                },
                {
                    path: "/editor/prizes",
                    element: <AddPrizes />
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
            path: "/qr/:code?",
            element: <QrCheck></QrCheck>,
        },
        {
            path: "/forgot-password",
            element: <ForgotPassword></ForgotPassword>,
        },
        {
            path: "/reset-password",
            element: <ResetPassword></ResetPassword>,
        },
        {
            path: "/email/verify/:id/:hash",
            element: <EmailVerification></EmailVerification>
        },
        {
            path: "/comingsoon",
            element: <EmailVerification></EmailVerification>
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
