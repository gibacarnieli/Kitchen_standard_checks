import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

export default function LoginForm({ setUser, handleCloseLogin, handleShowRegister, handleCloseRegister }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpClick = () => {
    // Navigate to the registration page or show/hide a registration modal
    // Example: navigate('/register');
  };

  const login = async (formData) => {
    try {
      setLoading(true);
      const response = await axios.post('http://your-api-domain/api/auth/login/', formData);

      // Check the structure of your response to determine success
      if (response.data.success) {
        setUser(response.data);
        handleCloseLogin();
        navigate('/fridges');
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <>
      {/* ... (rest of your component) */}
      <Modal.Footer>
        <p>
          Don't have an account?{' '}
          {/* Use the onClick handler to trigger navigation to the registration page */}
          <span className='fw-bold' onClick={handleSignUpClick} style={{ cursor: 'pointer' }}>
            Sign up
          </span>
        </p>
      </Modal.Footer>
    </>
  );
}
