import axios from 'axios';

const tokenName = 'SEI-76-KITCHEN-TOKEN';

export async function formToObj(request) {
  try {
    // Check if the request is already a FormData object
    if (request instanceof FormData) {
      return Object.fromEntries(request.entries());
    }

    // If not, assume it's a form element and create FormData from it
    const formData = new FormData(request);
    return Object.fromEntries(formData.entries());
  } catch (error) {
    console.error('Error converting form data:', error);
    console.log('Request object:', request); // Log the request object
    throw new Error('Failed to convert form data');
  }
}

export function setToken(token) {
  localStorage.setItem(tokenName, token);
}

export function getToken() {
  return localStorage.getItem(tokenName);
}

export function removeToken() {
  localStorage.removeItem(tokenName);
}

export function activeUser() {
  const token = getToken();
  if (!token) return null;

  // If token exists
  const b64 = token.split('.')[1];
  const payload = JSON.parse(atob(b64));

  const now = Date.now() / 1000;
  const exp = payload.exp;
  if (exp > now) {
    console.log(payload.user_id);
    return payload.user_id;
  }

  // Validate expiry date (payload.exp) by checking the number is greater than the date right now
}

export async function loginUser(request) {
  try {
    const data = await formToObj(request);
    const response = await axios.post('/api/auth/login', data, {
      validateStatus: () => true,
    });
    console.log(response); // Log the entire response for debugging
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}


