import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from './App'
import AddVideo from './components/AddVideo'
import EditQuestions from './pages/EditQuestions';
import Editor from './pages/Editor';
import Help from './pages/Help';
import Feedback from './pages/Feedback';
import LogIn from './components/LogIn';
import { ContextProvider } from './contexts/ContextProvider';
import Dashboard from './pages/Dashboard';
import EditorDash from './pages/EditorDash';
import WatchVideo from './pages/WatchVideo';
import Settings from './pages/Settings';
import Redirect from './pages/Redirect';
import UserLogin from './components/UserLogin';
import UserPage from './pages/UserPage';
import UserSettings from './pages/UserSettings';
import User from './pages/User';
import Privacy from './pages/Privacy';
import Imprint from './pages/Imprint';
import Search from './pages/Search';

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
          path: "/editor/edit/*",
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
      element: <UserLogin></UserLogin>
    },
    {
      path: "/redirect",
      element: <Redirect></Redirect>
    }
  ],
  {
    basename: `${import.meta.env.BASE_URL}`,
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>,
)
