
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
import Admin from './Pages/Admin.jsx';
import AdminRoute from './Components/AdminRoute.jsx';
import CreateTournament from './Pages/CreateTournament.jsx';
import PublishTournaments from './Pages/PublishTournaments.jsx';
import GenerateMatches from './Pages/GenerateMatches.jsx';
import ManageRegistrations from './Pages/ManageRegistration.jsx';
import TournamentRegistrations from './Pages/TournamentRegistration.jsx';
import ContactUs from './Pages/ContactUs.jsx';
import AdminMatchControl from './Pages/AdminMatchController.jsx';
import Matches from './Pages/Matches.jsx';


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
        path: '/tournaments',
        element: <Tournament />,
      },
      {
        path: '/register/:id',
        element: <Register />
      },
      {
        path: '/admin',
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
      },
      {
        path: '/createTournament',
        element: <CreateTournament />
      },
      {
        path: '/publishTournament',
        element: <PublishTournaments />
      },
      {
        path: '/generateMatches',
        element: <GenerateMatches />
      },
      {
        path: '/manageRegistration',
        element: <ManageRegistrations />
      },
      {
        path: '/manageRegistration/:tournamentId',
        element: <TournamentRegistrations />
      },
      {
        path: '/contactus',
        element: <ContactUs />
      },

      {
        path: "/admin/match/:id",
        element: <AdminMatchControl />
      },
      {
        path: '/matches/:tournamentId',
        element: <Matches />
      },
     
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
