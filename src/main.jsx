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
import LoggedIn from './pages/LoggedIn';
import LogIn from './components/LogIn';
import { ContextProvider } from './contexts/ContextProvider';
import Dashboard from './pages/Dashboard';
import EditorDash from './pages/EditorDash';
import WatchVideo from './pages/WatchVideo';
import Settings from './pages/Settings';

const router = createBrowserRouter([
  {
    path: "/editor",
    element: <LoggedIn />,
    children: [
      {
        index: true,
        element: <Navigate to="/editor/list"/>,
      },
      {
        path: "/editor/list",
        element:<EditorDash/>
      },
      {
        path: "/editor/add",
        element: <AddVideo />
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
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/list"/>
      },
      {
        path: "/list",
        element: <Dashboard/>
      },
      {
        path: "/watch",
        element: <WatchVideo/>
      }

    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>,
)
