import { useEffect } from 'react';
import { Form, useActionData, useNavigate, Link } from 'react-router-dom';
import { setToken } from '../utilities/helpers/common';
import { loginUser } from '../utilities/actions/auth';

export default function Login() {
  const res = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoginSuccess = async () => {
      if (res?.status === 200) {
        setToken(res.data.access);

        // Extract user information from the response
        const userId = res.data.user_id;
        const username = res.data.username;
        const authToken = res.data.token;
        console.log('Logged In User ID:', userId);
        console.log('Logged In Username:', username);

        // Set user information in localStorage
        localStorage.setItem('SEI-76-KITCHEN-USERID', userId);
        localStorage.setItem('SEI-76-KITCHEN-USERNAME', username);
        localStorage.setItem('SEI-76-KITCHEN-AUTH-TOKEN', authToken);

        console.log('User ID in localStorage:', localStorage.getItem('SEI-76-KITCHEN-USERID'));
        console.log('Username in localStorage:', localStorage.getItem('SEI-76-KITCHEN-USERNAME'));    

        console.log('Stored data:', {
          userId: localStorage.getItem('SEI-76-KITCHEN-USERID'),
          username: localStorage.getItem('SEI-76-KITCHEN-USERNAME'),
          authToken: localStorage.getItem('SEI-76-KITCHEN-AUTH-TOKEN'),
        });

        navigate('/profile'); // Redirect to the profile page
      } 
    };

    handleLoginSuccess();
  }, [res, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const loginResponse = await loginUser(event.target);

      if (loginResponse?.status === 200) {
        setToken(loginResponse.data.access);

        // Extract user information from the response
        const userId = loginResponse.data.user_id;
        const username = loginResponse.data.username;

        // Set user information in localStorage
        localStorage.setItem('SEI-76-KITCHEN-USERID', userId);
        localStorage.setItem('SEI-76-KITCHEN-USERNAME', username);

        navigate('/profile');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <>
      <Form className="login-form" onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder='username' /><br />
        <input type="password" name="password" placeholder="Password" /><br />
        <button className='reg-login-btn' type="submit">Login</button><br /><br />
        {res && <p className='danger'>{res.data.message}</p>}
        <p className="login">
          Don't have an account?{'\u00a0'} <Link to="/register"><span className="reg-login-link"> Register here</span></Link>
        </p>
      </Form>
    </>
  );
}







