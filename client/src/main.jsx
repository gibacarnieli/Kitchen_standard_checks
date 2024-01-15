
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './componentts/Home.jsx';
import Login from './componentts/Login.jsx';
import Register from './componentts/Register.jsx';
import FridgeList from './componentts/FridgeList.jsx';
import Profile from './componentts/Profile.jsx';  // Import your Profile component
import ErrorPage from './componentts/ErrorPage.jsx';
import { loginUser, registerUser } from './utilities/actions/auth.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
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
    path: '/fridges/',
    element: <FridgeList />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

// Use createRoot from react-dom/client
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);


