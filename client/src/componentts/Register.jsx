
import { useState } from "react";
import { Form, useNavigate, Link } from "react-router-dom";
import { registerUser } from "../utilities/actions/auth";

export default function Register() {
  const [registrationResult, setRegistrationResult] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Get form data and make registration request
      const response = await registerUser(event.target);

      // Store the registration result in the local state
      setRegistrationResult(response);

      // Check the response status and navigate if successful
      if (response.status === 201) {
        navigate('/login');
      } else {
        // Handle other scenarios, show error message, etc.
        console.error('Registration failed:', response.data.message);
      }
    } catch (error) {
      // Handle registration error if needed
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <>
      <h2>Register</h2>
      <Form method="post" className="registerform" onSubmit={handleSubmit}>
        <input className="registeruser" type="text" name="username" placeholder='Username' /><br />
        <input className="registeremail" type="email" name="email" placeholder='Email address' /><br />
        <input className="registerpass" type="password" name="password" placeholder='Password' /><br />
        <input className="registerpasscon" type="password" name="password_confirmation" placeholder='Confirm password' /><br /><br />
        <button className="reg-login-btn" type="submit">Register</button><br /><br />
        <p className="register">Already have an account?{'\u00a0'} <Link to="/login"><span className='reg-login-link'> Login</span></Link></p>
        {registrationResult && <p className="danger">{registrationResult.data.message}</p>}
      </Form>
    </>
  );
}



