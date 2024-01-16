import Login from './Login'; // Import your Login component
import Register from './Register';

export default function Home() {
  return (
    <>
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
