
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Page Componentes 
import App from './App.jsx'
import Home from './componentts/Home.jsx';
import Login from './componentts/Login.jsx';
import Register from './componentts/Register.jsx';
import Profile from './componentts/Profile.jsx';
import ErrorPage from './componentts/ErrorPage.jsx';

// Loaders
import { loginUser, registerUser } from './utilities/actions/auth.js';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.scss'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <Login />,
        action: async ({ request }) => loginUser(request)
      },
      {
        path: '/register',
        element: <Register />,
        action: async ({ request }) => registerUser(request),
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/',
        element: <Home />,
      },
    ]
  }
])

// Use createRoot from react-dom/client
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);


