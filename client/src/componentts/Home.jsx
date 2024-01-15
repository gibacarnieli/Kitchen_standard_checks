// Home.jsx


import Login from './Login'; // Replace with the actual path to your LoginForm component
import Register from './Register';

export default function Home() {
  return (
    <>
      {/* Your existing Slider or other introductory components go here */}
      
      <div className="container">
        {/* Login Form */}
        <div className="mb-4">
          <h2>Login</h2>
          <Login />
        </div>

        {/* Registration Form */}
        <div className="mb-4">
          <h2>Register</h2>
          <Register />
        </div>
      </div>
    </>
  );
}
