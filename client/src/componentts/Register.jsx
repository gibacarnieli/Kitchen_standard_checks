
import { Form, useActionData, useNavigate, Link } from "react-router-dom";
import { registerUser } from "../utilities/actions/auth"; // Import your registerUser function

export default function Register() {
  const res = useActionData();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Get form data and make registration request
      await registerUser(event.target);
      // Check the response and navigate if successful
      if (res?.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      // Handle registration error if needed
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <>
      <Form method="post" className="registerform" onSubmit={handleSubmit}>
        <input className="registeruser" type="text" name="username" placeholder='Username' /><br />
        <input className="registeremail" type="email" name="email" placeholder='Email address' /><br />
        <input className="registerpass" type="password" name="password" placeholder='Password' /><br />
        <input className="registerpasscon" type="password" name="password_confirmation" placeholder='Confirm password' /><br /><br />
        <button className="reg-login-btn" type="submit">Register</button><br /><br />
        <p className="register">Already have an account?{'\u00a0'} <Link to="/login"><span className='reg-login-link'> Login</span></Link></p>
        {res && <p className="danger">{res.data.message}</p>}
      </Form>
    </>
  );
}




