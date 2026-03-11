
import 'bootstrap/dist/css/bootstrap.min.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from './App.jsx'
import Root from './Root/Root.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Tournament from './pages/Tournament.jsx';
import Register from './pages/Register.jsx';
import Admin from './pages/Admin.jsx';
import AdminRoute from './Components/AdminRoute.jsx'
import CreateTournament from './pages/CreateTournament.jsx';
import PublishTournaments from './pages/PublishTournaments.jsx';
import GenerateMatches from './pages/GenerateMatches.jsx';
import ManageRegistrations from './pages/ManageRegistration.jsx';
import TournamentRegistrations from './pages/TournamentRegistration.jsx';
import ContactUs from './pages/ContactUs.jsx';
import AdminMatchControl from './pages/AdminMatchController.jsx';
import Matches from './pages/Matches.jsx';


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
