
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { activeUser } from '../utilities/helpers/common';
import FridgeForm from './FridgeForm';
import MeatForm from './MeatForm';

import '../styles/components/Profile.scss';

const Profile = () => {
  const [fridges, setFridges] = useState([]);
  const [meats, setMeats] = useState([]);
  const [profileId, setProfileId] = useState(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [fridgeReviewText, setFridgeReviewText] = useState({});
  const [editableMeatId, setEditableMeatId] = useState(null);
  const [updatedMeatData, setUpdatedMeatData] = useState({
    meatName: '',
    temperature: '',
  });
  const [forceUpdate, forceUpdateId] = useState((x) => x + 1, 0);
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

        setProfileId(loggedInUserId);
        setUsername(loggedInUsername);

        setLoading(true);

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
  }, [navigate, forceUpdate]);

  useEffect(() => {
    if (editableMeatId) {
      const selectedMeat = meats.find((meat) => meat.id === editableMeatId);

      setUpdatedMeatData({
        meatName: selectedMeat?.meatName || '',
        temperature: selectedMeat?.temperature || '',
      });
    }
  }, [editableMeatId, meats]);

  const handleFridgeCreated = async (newFridge) => {
    if (newFridge.owner && newFridge.owner.id === profileId) {
      try {
        await axios.post('http://localhost:8000/api/fridges/', newFridge);
        forceUpdateId(); // Trigger re-render
      } catch (error) {
        console.error('Error creating fridge:', error.message);
      }
    }
  };

  const handleMeatCreated = async (newMeat) => {
    if (newMeat.owner && newMeat.owner.id === profileId) {
      try {
        await axios.post('http://localhost:8000/api/meats/', newMeat);
        forceUpdateId(); // Trigger re-render
      } catch (error) {
        console.error('Error creating meat:', error.message);
      }
    }
  };

  const handleReviewFridge = async (fridgeId, reviewText) => {
    try {
      const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');

      if (!reviewText) {
        console.error('Review text is required.');
        return;
      }

      const reviewResponse = await axios.post(
        'http://localhost:8000/api/reviews/',
        {
          text: reviewText,
          fridge: fridgeId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Review submitted successfully:', reviewResponse.data);

      setFridgeReviewText((prev) => ({ ...prev, [fridgeId]: '' }));
    } catch (error) {
      console.error('Error submitting review:', error.message);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');
      const formattedReviewId = String(reviewId);

      await axios.delete(`http://localhost:8000/api/reviews/${formattedReviewId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Review deleted successfully:', reviewId);
    } catch (error) {
      console.error('Error deleting review:', error.message);
    }
  };

  const handleDeleteFridge = async (fridgeId) => {
    try {
      const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');
      const formattedFridgeId = String(fridgeId);

      await axios.delete(`http://localhost:8000/api/fridges/${formattedFridgeId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Fridge deleted successfully:', fridgeId);
      forceUpdateId(); // Trigger re-render
    } catch (error) {
      console.error('Error deleting fridge:', error.message);
    }
  };

  const handleDeleteMeat = async (meatId) => {
    try {
      const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');
      const formattedMeatId = String(meatId);

      await axios.delete(`http://localhost:8000/api/meats/${formattedMeatId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Meat record deleted successfully:', meatId);
      forceUpdateId(); // Trigger re-render
    } catch (error) {
      console.error('Error deleting meat record:', error.message);
    }
  };

  const handleUpdateMeat = async (meatId, updatedData) => {
    try {
      const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');
      const formattedMeatId = String(meatId);

      await axios.patch(`http://localhost:8000/api/meats/${formattedMeatId}/`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Meat record updated successfully:', meatId);

      const updatedMeatsResponse = await axios.get(`http://localhost:8000/api/meats/?owner=${profileId}`);
      setMeats(updatedMeatsResponse.data);

      setEditableMeatId(null);
      setUpdatedMeatData({
        meatName: '',
        temperature: '',
      });
    } catch (error) {
      console.error('Error updating meat record:', error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-page">
      <h2>Welcome Back!</h2>
      

      <div className="create-buttons">
        <FridgeForm ownerId={profileId} onFridgeCreated={handleFridgeCreated} />
        <MeatForm
          ownerId={profileId}
          onMeatCreated={handleMeatCreated}
          defaultValues={updatedMeatData}
        />
      </div>

      <div className="temperatures-container">
        <div className="fridges-container">
          <h4>Fridges Temperatures</h4>
          <div className="fridges-row">
            {fridges.map((fridge) => (
              <div key={fridge.id} className="fridge-box">
                <h4>Fridge Number: {fridge.fridgeNumber}</h4>
                <p>Temperature: {fridge.temperature}</p>
                <p>Date: {fridge.date}</p>

                <label>Review Your Fridge:</label>
                <input
                  type="text"
                  className="review-input"
                  value={fridgeReviewText[fridge.id] || ''}
                  onChange={(e) => setFridgeReviewText((prev) => ({ ...prev, [fridge.id]: e.target.value }))}
                />

                <button className="common-button" onClick={() => handleReviewFridge(fridge.id, fridgeReviewText[fridge.id])}>
                  Review This Fridge
                </button>

                <button className="common-button" onClick={() => handleDeleteFridge(fridge.id)}>
                  Delete Fridge
                </button>

                <ul>
                  {reviews
                    .filter((review) => review.fridge === fridge.id)
                    .map((review) => (
                      <li key={review.id}>
                        Review: {review.text}
                        <button className="common-button" onClick={() => handleDeleteReview(review.id)}>
                          Delete
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="meats-container">
          <h4>Meats Temperatures</h4>
          <div className="meats-row">
            {meats.map((meat) => (
              <div key={meat.id} className="meats-box">
                {editableMeatId === meat.id ? (
                  <div>
                    <label>Meat Name:</label>
                    <input
                      type="text"
                      value={updatedMeatData.meatName}
                      onChange={(e) => setUpdatedMeatData((prev) => ({ ...prev, meatName: e.target.value }))}
                    />
                    <label>Temperature:</label>
                    <input
                      type="text"
                      value={updatedMeatData.temperature}
                      onChange={(e) => setUpdatedMeatData((prev) => ({ ...prev, temperature: e.target.value }))}
                    />
                    <button className="common-button" onClick={() => handleUpdateMeat(meat.id, updatedMeatData)}>
                      Update Meat
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>Meat Name: {meat.meatName}</p>
                    <p>Temperature: {meat.temperature}</p>
                    <button className="common-button" onClick={() => setEditableMeatId(meat.id)}>
                      Edit Meat
                    </button>
                    <button className="common-button" onClick={() => handleDeleteMeat(meat.id)}>
                      Delete Meat
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;



