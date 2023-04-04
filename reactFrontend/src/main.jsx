import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddQuestions from './pages/AddQuestions'
import EditQuestions from './pages/EditQuestions';
import LoggedIn from './components/LoggedIn';
import LogIn from './components/LogIn';
import { ContextProvider } from './contexts/ContextProvider';

const router = createBrowserRouter([
  {
    path: "/editor",
    element: <LoggedIn />,
    children: [
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
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>,
)
