import { useEffect, useState } from 'react';
import axios from 'axios';
import FridgeForm from './FridgeForm';
import MeatForm from './MeatForm';
import { useNavigate } from 'react-router-dom';
import { activeUser } from '../utilities/helpers/common';

const Profile = () => {
  const [fridges, setFridges] = useState([]);
  const [meats, setMeats] = useState([]);
  const [profileId, setProfileId] = useState(null);
  const [username, setUsername] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [fridgeReviewText, setFridgeReviewText] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const loggedInUserId = activeUser();
        const loggedInUsername = activeUser();
  
        if (!loggedInUserId || !loggedInUsername) {
          console.error('User not authenticated.');
          navigate('/login', { replace: true });
          return;
        }
  
        console.log('User ID:', loggedInUserId);
        console.log('Username:', loggedInUsername);
  
        setProfileId(loggedInUserId);
        setUsername(loggedInUsername);
  
        const fridgesResponse = await axios.get(`http://localhost:8000/api/fridges/?owner=${loggedInUserId}`);
        setFridges(fridgesResponse.data);
  
        const meatsResponse = await axios.get(`http://localhost:8000/api/meats/?owner=${loggedInUserId}`);
        setMeats(meatsResponse.data);
  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error.message);
        setLoading(false);
      }
    };
  
    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axios.get('http://localhost:8000/api/reviews/');
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching reviews:', error.message);
      }
    };
  
    fetchProfileData();
    fetchReviews();
  }, [navigate]);

  const handleLogout = () => {
    // Perform any logout logic here
    // ...

    // Navigate to the login page without preserving history
    navigate('/login', { replace: true });
  };

  const handleFridgeCreated = (newFridge) => {
    // Ensure the new fridge belongs to the logged-in user
    if (newFridge.owner && newFridge.owner.id === profileId) {
      setFridges((prevFridges) => [...prevFridges, newFridge]);
    }
  };

  const handleMeatCreated = (newMeat) => {
    // Ensure the new meat belongs to the logged-in user
    if (newMeat.owner && newMeat.owner.id === profileId) {
      setMeats((prevMeats) => [...prevMeats, newMeat]);
    }
  };

  const handleReviewFridge = async (fridgeId, reviewText) => {
    try {
      // Fetch the authentication token
      const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');

      // Make sure reviewText is not undefined or empty
      if (!reviewText) {
        console.error('Review text is required.');
        // Handle the case where review text is not provided
        return;
      }

      // Send a POST request to create a review
      const reviewResponse = await axios.post(
        'http://localhost:8000/api/reviews/',
        {
          text: reviewText,
          fridge: fridgeId,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Review submitted successfully:', reviewResponse.data);
      // Handle successful review submission as needed

      // Optionally, you can update the local state to reflect the new review
      // or fetch the updated fridge data to refresh the UI.
      // ...

      // Clear the review text after submission
      setFridgeReviewText((prev) => ({ ...prev, [fridgeId]: '' }));

    } catch (error) {
      console.error('Error submitting review:', error.message);
      // Handle error as needed
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      // Fetch the authentication token
      const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');
  
      // Convert reviewId to string format
      const formattedReviewId = String(reviewId);
  
      // Send a DELETE request to delete the review
      await axios.delete(`http://localhost:8000/api/reviews/${formattedReviewId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      console.log('Review deleted successfully:', reviewId);
      // Optionally, you can update the local state to remove the deleted review
      // or fetch the updated fridge data to refresh the UI.
      // ...
  
    } catch (error) {
      console.error('Error deleting review:', error.message);
      // Handle error as needed
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>Welcome, {username}!</h2>

      <h2>Fridges Owned:</h2>
      <ul>
        {fridges.map((fridge) => (
          <li key={fridge.id}>
            Fridge Number: {fridge.fridgeNumber}, Temperature: {fridge.temperature}, Date: {fridge.date}

            {/* Add a new input for review text */}
            <label>Review Your Fridge:</label>
            <input
              type="text"
              value={fridgeReviewText[fridge.id] || ''}
              onChange={(e) => setFridgeReviewText((prev) => ({ ...prev, [fridge.id]: e.target.value }))}
            />

            {/* Add the review button for each fridge */}
            <button onClick={() => handleReviewFridge(fridge.id, fridgeReviewText[fridge.id])}>
              Review This Fridge
            </button>

            {/* Add a delete button for each review */}
            <ul>
              {reviews
                .filter((review) => review.fridge === fridge.id)
                .map((review) => (
                  <li key={review.id}>
                    Review: {review.text}
                    <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
      <FridgeForm ownerId={profileId} onFridgeCreated={handleFridgeCreated} />

      <h2>Meats Owned:</h2>
      <ul>
        {meats.map((meat) => (
          <li key={meat.id}>
            Meat Name: {meat.meatName}, Temperature: {meat.temperature}
          </li>
        ))}
      </ul>

      <MeatForm ownerId={profileId} onMeatCreated={handleMeatCreated} />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;





