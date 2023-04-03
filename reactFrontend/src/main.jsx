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
import { Sanctum } from 'react-sanctum';
import LoggedIn from './components/LoggedIn';
import LogIn from './components/LogIn';

const router = createBrowserRouter([
  {
    path: "/editor",
    element: <LoggedIn />,
    children: [
      {
        path: "/editor/*",
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
  },
  {
    path: "/login/",
    element: <LogIn></LogIn>
  }
]);

const sanctumConfig = {
  apiUrl: "localhost:8000",
  csrfCookieRoute: "sanctum/csrf-cookie",
  signInRoute: "login",
  signOutRoute: "logout",
  userObjectRoute: "user",
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Sanctum config={sanctumConfig}> */}
      <RouterProvider router={router} />
    {/* </Sanctum> */}
  </React.StrictMode>,
)
