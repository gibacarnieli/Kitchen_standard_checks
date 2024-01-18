// // auth.js
// import axios from "axios";

// export async function registerUser(request) {
//   try {
//     const data = await formToObj(request);
//     const response = await axios.post('http://localhost:8000/api/auth/register/', data);
//     console.log(response); // Log the entire response for debugging
//     return response;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       // Handle Axios errors (e.g., network issues)
//       console.error('Network error:', error);
//     } else {
//       // Handle other errors
//       console.error('Error registering user:', error);
//     }
//     throw error;
//   }
// }

// export async function loginUser(request) {
//   try {
//     const data = await formToObj(request);
//     const response = await axios.post('http://localhost:8000/api/auth/login/', data);
//     console.log(response); // Log the entire response for debugging
//     return response;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       // Handle Axios errors (e.g., network issues)
//       console.error('Network error:', error);
//     } else {
//       // Handle other errors
//       console.error('Error logging in user:', error);
//     }
//     throw error;
//   }
// }

// async function formToObj(request) {
//   const formData = await request.formData();
//   return Object.fromEntries(formData.entries());
// }
// auth.js

import axios from "axios";

export async function registerUser(request) {
  try {
    const data = await formToObj(request);
    const response = await axios.post('http://localhost:8000/api/auth/register/', data);
    console.log(response); 
    return response;
  } catch (error) {
    handleAuthError(error);
  }
}

export async function loginUser(request) {
  try {
    const data = await formToObj(request);
    const response = await axios.post('http://localhost:8000/api/auth/login/', data);
    console.log(response); 
    return response;
  } catch (error) {
    handleAuthError(error);
  }
}

async function formToObj(request) {
  try {
    const formData = new FormData(request);
    const data = Object.fromEntries(formData.entries());
    return data;
  } catch (error) {
    handleAuthError(error);
  }
}

function handleAuthError(error) {
  if (axios.isAxiosError(error)) {
    
    console.error('Network error:', error);
  } else {
    
    console.error('Authentication error:', error);
  }
  throw error;
}
