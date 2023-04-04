import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AddQuestions from './pages/AddQuestions'
import EditQuestions from './pages/EditQuestions';
import LoggedIn from './components/LoggedIn';
import LogIn from './components/LogIn';
import { ContextProvider } from './contexts/ContextProvider';
import VideoList from './pages/VideoList';
import Dashboard from './pages/Dashboard';

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
        element:<VideoList/>
      },
      {
        path: "/editor/add",
        element: <AddQuestions />
      },      
      {
        path: "/editor/edit/*",
        element: <EditQuestions />
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
