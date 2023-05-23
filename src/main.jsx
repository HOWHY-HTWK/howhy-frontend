import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AddVideo from './components/AddVideo'
import EditQuestions from './pages/EditQuestions';
import Editor from './pages/Editor';
import LogIn from './components/LogIn';
import { ContextProvider } from './contexts/ContextProvider';
import Dashboard from './pages/Dashboard';
import EditorDash from './pages/EditorDash';
import WatchVideo from './pages/WatchVideo';
import Settings from './pages/Settings';
import Redirect from './pages/Redirect';
import UserLogin from './components/UserLogin';

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
          path: "/watch",
          element: <WatchVideo />
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
