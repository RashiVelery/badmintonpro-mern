
import 'bootstrap/dist/css/bootstrap.min.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './app.css'
import App from './App.jsx'
import Root from './Root/Root.jsx';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import Tournament from './Pages/Tournament.jsx';
import Register from './Pages/Register.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: '/',
        element: <Home />
      },
      {
        path:'/tournaments',
        element:<Tournament/>,
      },
      {
        path:'/register/:id',
        element:<Register/>
      },
      
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
