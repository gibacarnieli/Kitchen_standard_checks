// auth.js
import axios from "axios";

export async function registerUser(request) {
  try {
    const data = await formToObj(request);
    const response = await axios.post('http://localhost:8000/api/auth/register/', data);
    console.log(response); // Log the entire response for debugging
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues)
      console.error('Network error:', error);
    } else {
      // Handle other errors
      console.error('Error registering user:', error);
    }
    throw error;
  }
}

export async function loginUser(request) {
  try {
    const data = await formToObj(request);
    const response = await axios.post('http://localhost:8000/api/auth/login/', data);
    console.log(response); // Log the entire response for debugging
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues)
      console.error('Network error:', error);
    } else {
      // Handle other errors
      console.error('Error logging in user:', error);
    }
    throw error;
  }
}

async function formToObj(request) {
  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
}
