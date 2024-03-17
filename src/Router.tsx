import React, { Suspense } from "react"

import Dashboard from "./pages/app/dashboard/Dashboard"
import EditorDash from "./pages/editor/EditorDash"
import { VideoPlayer } from "./pages/app/videoPlayer/VideoPlayer"
import Settings from "./pages/editor/settings/Settings"
import { Settings as UserSettings } from "./pages/app/settings/Settings"
import User from "./pages/app/user/User"
import Privacy from "./pages/shared/pages/Privacy"
import Imprint from "./pages/shared/pages/Imprint"
import QrCheck from "./pages/shared/pages/QrCheck"
import App from "./pages/app/App"
import EditQuestions from "./pages/editor/edit/EditQuestions"
import Editor from "./pages/editor/Editor"
import Help from "./pages/app/help/Help"
import Feedback from "./pages/app/feedback/Feedback"
import LogIn from "./pages/editor/login/LogIn"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ForgotPassword from "./pages/shared/pages/ForgotPassword"
import ResetPassword from "./pages/shared/pages/ResetPassword"
import EmailVerification from "./pages/shared/pages/EmailVerification"
import AddPrizes from "./pages/editor/settings/components/AddPrizes"
import Statistics from "./pages/editor/statistics/Statistics"
import Loader from "./pages/shared/components/Loader"
import { UserPage } from "./pages/app/user/UserPage"

const UserLogin = React.lazy(() => import("./pages/app/login/UserLogin"))

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
                    element: <VideoPlayer />
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
                },
                {
                    path: "/editor/stats",
                    element: <Statistics></Statistics>
                }
            ]
        },
        {
            path: "/login",
            element: <LogIn></LogIn>
        },
        {
            path: "/userlogin",
            element: (
                <Suspense fallback={<Loader />}>
                    <UserLogin />
                </Suspense>
            )
        },
        {
            path: "/qr/:code?",
            element: <QrCheck></QrCheck>
        },
        {
            path: "/forgot-password",
            element: <ForgotPassword></ForgotPassword>
        },
        {
            path: "/reset-password",
            element: <ResetPassword></ResetPassword>
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
        basename: `${import.meta.env.BASE_URL}`
    }
)

export default function Router() {
    return <RouterProvider router={router} />
}
