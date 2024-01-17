// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import FridgeForm from './FridgeForm';
// import MeatForm from './MeatForm';
// import { useNavigate } from 'react-router-dom';
// import { activeUser } from '../utilities/helpers/common';

// const Profile = () => {
//   const [fridges, setFridges] = useState([]);
//   const [meats, setMeats] = useState([]);
//   const [profileId, setProfileId] = useState(null);
//   const [username, setUsername] = useState('');
//   // eslint-disable-next-line no-unused-vars
//   const [loading, setLoading] = useState(true);
//   const [reviews, setReviews] = useState([]);
//   const [fridgeReviewText, setFridgeReviewText] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const loggedInUserId = activeUser();
//         const loggedInUsername = activeUser();
  
//         if (!loggedInUserId || !loggedInUsername) {
//           console.error('User not authenticated.');
//           navigate('/login', { replace: true });
//           return;
//         }
  
//         console.log('User ID:', loggedInUserId);
//         console.log('Username:', loggedInUsername);
  
//         setProfileId(loggedInUserId);
//         setUsername(loggedInUsername);
  
//         const fridgesResponse = await axios.get(`http://localhost:8000/api/fridges/?owner=${loggedInUserId}`);
//         setFridges(fridgesResponse.data);
  
//         const meatsResponse = await axios.get(`http://localhost:8000/api/meats/?owner=${loggedInUserId}`);
//         setMeats(meatsResponse.data);
  
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching profile data:', error.message);
//         setLoading(false);
//       }
//     };
  
//     const fetchReviews = async () => {
//       try {
//         const reviewsResponse = await axios.get('http://localhost:8000/api/reviews/');
//         setReviews(reviewsResponse.data);
//       } catch (error) {
//         console.error('Error fetching reviews:', error.message);
//       }
//     };
  
//     fetchProfileData();
//     fetchReviews();
//   }, [navigate]);

//   const handleLogout = () => {
//     // Perform any logout logic here
//     // ...

//     // Navigate to the login page without preserving history
//     navigate('/login', { replace: true });
//   };

//   const handleFridgeCreated = (newFridge) => {
//     // Ensure the new fridge belongs to the logged-in user
//     if (newFridge.owner && newFridge.owner.id === profileId) {
//       setFridges((prevFridges) => [...prevFridges, newFridge]);
//     }
//   };

//   const handleMeatCreated = (newMeat) => {
//     // Ensure the new meat belongs to the logged-in user
//     if (newMeat.owner && newMeat.owner.id === profileId) {
//       setMeats((prevMeats) => [...prevMeats, newMeat]);
//     }
//   };

//   const handleReviewFridge = async (fridgeId, reviewText) => {
//     try {
//       // Fetch the authentication token
//       const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');

//       // Make sure reviewText is not undefined or empty
//       if (!reviewText) {
//         console.error('Review text is required.');
//         // Handle the case where review text is not provided
//         return;
//       }

//       // Send a POST request to create a review
//       const reviewResponse = await axios.post(
//         'http://localhost:8000/api/reviews/',
//         {
//           text: reviewText,
//           fridge: fridgeId,
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       console.log('Review submitted successfully:', reviewResponse.data);
//       // Handle successful review submission as needed

//       // Optionally, you can update the local state to reflect the new review
//       // or fetch the updated fridge data to refresh the UI.
//       // ...

//       // Clear the review text after submission
//       setFridgeReviewText((prev) => ({ ...prev, [fridgeId]: '' }));

//     } catch (error) {
//       console.error('Error submitting review:', error.message);
//       // Handle error as needed
//     }
//   };

//   const handleDeleteReview = async (reviewId) => {
//     try {
//       // Fetch the authentication token
//       const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');
  
//       // Convert reviewId to string format
//       const formattedReviewId = String(reviewId);
  
//       // Send a DELETE request to delete the review
//       await axios.delete(`http://localhost:8000/api/reviews/${formattedReviewId}/`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
  
//       console.log('Review deleted successfully:', reviewId);
//       // Optionally, you can update the local state to remove the deleted review
//       // or fetch the updated fridge data to refresh the UI.
//       // ...
  
//     } catch (error) {
//       console.error('Error deleting review:', error.message);
//       // Handle error as needed
//     }
//   };

//   return (
//     <div>
//       <h1>Profile Page</h1>
//       <h2>Welcome, {username}!</h2>

//       <h2>Fridges Owned:</h2>
//       <ul>
//         {fridges.map((fridge) => (
//           <li key={fridge.id}>
//             Fridge Number: {fridge.fridgeNumber}, Temperature: {fridge.temperature}, Date: {fridge.date}

//             {/* Add a new input for review text */}
//             <label>Review Your Fridge:</label>
//             <input
//               type="text"
//               value={fridgeReviewText[fridge.id] || ''}
//               onChange={(e) => setFridgeReviewText((prev) => ({ ...prev, [fridge.id]: e.target.value }))}
//             />

//             {/* Add the review button for each fridge */}
//             <button onClick={() => handleReviewFridge(fridge.id, fridgeReviewText[fridge.id])}>
//               Review This Fridge
//             </button>

//             {/* Add a delete button for each review */}
//             <ul>
//               {reviews
//                 .filter((review) => review.fridge === fridge.id)
//                 .map((review) => (
//                   <li key={review.id}>
//                     Review: {review.text}
//                     <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
//                   </li>
//                 ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//       <FridgeForm ownerId={profileId} onFridgeCreated={handleFridgeCreated} />

//       <h2>Meats Owned:</h2>
//       <ul>
//         {meats.map((meat) => (
//           <li key={meat.id}>
//             Meat Name: {meat.meatName}, Temperature: {meat.temperature}
//           </li>
//         ))}
//       </ul>

//       <MeatForm ownerId={profileId} onMeatCreated={handleMeatCreated} />

//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Profile;


// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import FridgeForm from './FridgeForm';
// import MeatForm from './MeatForm';
// import { useNavigate } from 'react-router-dom';
// import { activeUser } from '../utilities/helpers/common';

// const Profile = () => {
//   const [fridges, setFridges] = useState([]);
//   const [meats, setMeats] = useState([]);
//   const [profileId, setProfileId] = useState(null);
//   const [username, setUsername] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [reviews, setReviews] = useState([]);
//   const [fridgeReviewText, setFridgeReviewText] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const loggedInUserId = activeUser();
//         const loggedInUsername = activeUser();
  
//         if (!loggedInUserId || !loggedInUsername) {
//           console.error('User not authenticated.');
//           navigate('/login', { replace: true });
//           return;
//         }
  
//         console.log('User ID:', loggedInUserId);
//         console.log('Username:', loggedInUsername);
  
//         setProfileId(loggedInUserId);
//         setUsername(loggedInUsername);
  
//         const fridgesResponse = await axios.get(`http://localhost:8000/api/fridges/?owner=${loggedInUserId}`);
//         setFridges(fridgesResponse.data);
  
//         const meatsResponse = await axios.get(`http://localhost:8000/api/meats/?owner=${loggedInUserId}`);
//         setMeats(meatsResponse.data);
  
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching profile data:', error.message);
//         setLoading(false);
//       }
//     };
  
//     const fetchReviews = async () => {
//       try {
//         const reviewsResponse = await axios.get('http://localhost:8000/api/reviews/');
//         setReviews(reviewsResponse.data);
//       } catch (error) {
//         console.error('Error fetching reviews:', error.message);
//       }
//     };
  
//     fetchProfileData();
//     fetchReviews();
//   }, [navigate]);

//   const handleLogout = () => {
//     navigate('/login', { replace: true });
//   };

//   const handleFridgeCreated = (newFridge) => {
//     if (newFridge.owner && newFridge.owner.id === profileId) {
//       setFridges((prevFridges) => [...prevFridges, newFridge]);
//     }
//   };

//   const handleMeatCreated = (newMeat) => {
//     if (newMeat.owner && newMeat.owner.id === profileId) {
//       setMeats((prevMeats) => [...prevMeats, newMeat]);
//     }
//   };

//   const handleReviewFridge = async (fridgeId, reviewText) => {
//     try {
//       const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');

//       if (!reviewText) {
//         console.error('Review text is required.');
//         return;
//       }

//       const reviewResponse = await axios.post(
//         'http://localhost:8000/api/reviews/',
//         {
//           text: reviewText,
//           fridge: fridgeId,
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       console.log('Review submitted successfully:', reviewResponse.data);

//       setFridgeReviewText((prev) => ({ ...prev, [fridgeId]: '' }));

//     } catch (error) {
//       console.error('Error submitting review:', error.message);
//     }
//   };

//   const handleDeleteReview = async (reviewId) => {
//     try {
//       const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');
  
//       const formattedReviewId = String(reviewId);
  
//       await axios.delete(`http://localhost:8000/api/reviews/${formattedReviewId}/`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
  
//       console.log('Review deleted successfully:', reviewId);
  
//     } catch (error) {
//       console.error('Error deleting review:', error.message);
//     }
//   };

//   const handleDeleteFridge = async (fridgeId) => {
//     try {
//       const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');
//       const formattedFridgeId = String(fridgeId);
  
//       await axios.delete(`http://localhost:8000/api/fridges/${formattedFridgeId}/`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
  
//       console.log('Fridge deleted successfully:', fridgeId);
  
//     } catch (error) {
//       console.error('Error deleting fridge:', error.message);
//     }
//   };

//   const handleDeleteMeat = async (meatId) => {
//     try {
//       const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');
//       const formattedMeatId = String(meatId);
  
//       await axios.delete(`http://localhost:8000/api/meats/${formattedMeatId}/`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
  
//       console.log('Meat record deleted successfully:', meatId);
  
//     } catch (error) {
//       console.error('Error deleting meat record:', error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Profile Page</h1>
//       <h2>Welcome, {username}!</h2>

//       <h2>Fridges Owned:</h2>
//       <ul>
//         {fridges.map((fridge) => (
//           <li key={fridge.id}>
//             Fridge Number: {fridge.fridgeNumber}, Temperature: {fridge.temperature}, Date: {fridge.date}

//             <label>Review Your Fridge:</label>
//             <input
//               type="text"
//               value={fridgeReviewText[fridge.id] || ''}
//               onChange={(e) => setFridgeReviewText((prev) => ({ ...prev, [fridge.id]: e.target.value }))}
//             />

//             <button onClick={() => handleReviewFridge(fridge.id, fridgeReviewText[fridge.id])}>
//               Review This Fridge
//             </button>

//             <button onClick={() => handleDeleteFridge(fridge.id)}>Delete Fridge</button>

//             <ul>
//               {reviews
//                 .filter((review) => review.fridge === fridge.id)
//                 .map((review) => (
//                   <li key={review.id}>
//                     Review: {review.text}
//                     <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
//                   </li>
//                 ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//       <FridgeForm ownerId={profileId} onFridgeCreated={handleFridgeCreated} />

//       <h2>Meats Owned:</h2>
//       <ul>
//         {meats.map((meat) => (
//           <li key={meat.id}>
//             Meat Name: {meat.meatName}, Temperature: {meat.temperature}
//             <button onClick={() => handleDeleteMeat(meat.id)}>Delete Meat</button>
//           </li>
//         ))}
//       </ul>

//       <MeatForm ownerId={profileId} onMeatCreated={handleMeatCreated} />

//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Profile;


// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { activeUser } from '../utilities/helpers/common';
// import FridgeForm from './FridgeForm';
// import MeatForm from './MeatForm';

// import '../styles/components/Profile.scss'

// const Profile = () => {
//   const [fridges, setFridges] = useState([]);
//   const [meats, setMeats] = useState([]);
//   const [profileId, setProfileId] = useState(null);
//   const [username, setUsername] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [reviews, setReviews] = useState([]);
//   const [fridgeReviewText, setFridgeReviewText] = useState({});
//   const [editableMeatId, setEditableMeatId] = useState(null);
//   const [updatedMeatData, setUpdatedMeatData] = useState({
//     meatName: '',
//     temperature: '',
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const loggedInUserId = activeUser();
//         const loggedInUsername = activeUser();

//         if (!loggedInUserId || !loggedInUsername) {
//           console.error('User not authenticated.');
//           navigate('/login', { replace: true });
//           return;
//         }

//         setProfileId(loggedInUserId);
//         setUsername(loggedInUsername);

//         const fridgesResponse = await axios.get(`http://localhost:8000/api/fridges/?owner=${loggedInUserId}`);
//         setFridges(fridgesResponse.data);

//         const meatsResponse = await axios.get(`http://localhost:8000/api/meats/?owner=${loggedInUserId}`);
//         setMeats(meatsResponse.data);

//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching profile data:', error.message);
//         setLoading(false);
//       }
//     };

//     const fetchReviews = async () => {
//       try {
//         const reviewsResponse = await axios.get('http://localhost:8000/api/reviews/');
//         setReviews(reviewsResponse.data);
//       } catch (error) {
//         console.error('Error fetching reviews:', error.message);
//       }
//     };

//     fetchProfileData();
//     fetchReviews();
//   }, [navigate]);

//   const handleLogout = () => {
//     navigate('/login', { replace: true });
//   };

//   const handleFridgeCreated = async (newFridge) => {
//     if (newFridge.owner && newFridge.owner.id === profileId) {
//       await setFridges((prevFridges) => [...prevFridges, newFridge]);
//     }
//   };

//   const handleMeatCreated = async (newMeat) => {
//     if (newMeat.owner && newMeat.owner.id === profileId) {
//       await setMeats((prevMeats) => [...prevMeats, newMeat]);
//     }
//   };

//   const handleReviewFridge = async (fridgeId, reviewText) => {
//     try {
//       const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');

//       if (!reviewText) {
//         console.error('Review text is required.');
//         return;
//       }

//       const reviewResponse = await axios.post(
//         'http://localhost:8000/api/reviews/',
//         {
//           text: reviewText,
//           fridge: fridgeId,
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       console.log('Review submitted successfully:', reviewResponse.data);

//       setFridgeReviewText((prev) => ({ ...prev, [fridgeId]: '' }));
//     } catch (error) {
//       console.error('Error submitting review:', error.message);
//     }
//   };

//   const handleDeleteReview = async (reviewId) => {
//     try {
//       const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');
//       const formattedReviewId = String(reviewId);

//       await axios.delete(`http://localhost:8000/api/reviews/${formattedReviewId}/`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       console.log('Review deleted successfully:', reviewId);
//     } catch (error) {
//       console.error('Error deleting review:', error.message);
//     }
//   };

//   const handleDeleteFridge = async (fridgeId) => {
//     try {
//       const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');
//       const formattedFridgeId = String(fridgeId);

//       await axios.delete(`http://localhost:8000/api/fridges/${formattedFridgeId}/`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       console.log('Fridge deleted successfully:', fridgeId);
//     } catch (error) {
//       console.error('Error deleting fridge:', error.message);
//     }
//   };

//   const handleDeleteMeat = async (meatId) => {
//     try {
//       const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');
//       const formattedMeatId = String(meatId);

//       await axios.delete(`http://localhost:8000/api/meats/${formattedMeatId}/`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       console.log('Meat record deleted successfully:', meatId);
//     } catch (error) {
//       console.error('Error deleting meat record:', error.message);
//     }
//   };

//   const handleUpdateMeat = async (meatId, updatedData) => {
//     try {
//       const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');
//       const formattedMeatId = String(meatId);

//       // Send a PATCH or PUT request to update the meat record
//       await axios.patch(`http://localhost:8000/api/meats/${formattedMeatId}/`, updatedData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log('Meat record updated successfully:', meatId);

//       // Fetch updated meats data to refresh the UI
//       const updatedMeatsResponse = await axios.get(`http://localhost:8000/api/meats/?owner=${profileId}`);
//       setMeats(updatedMeatsResponse.data);

//       setEditableMeatId(null);
//       setUpdatedMeatData({
//         meatName: '',
//         temperature: '', // Reset the updated data
//       });
//     } catch (error) {
//       console.error('Error updating meat record:', error.message);
//       // Handle error as needed
//       // For example, you can show a user-friendly error message
//       // setErrorState('Failed to update meat record. Please try again.');
//     }
//   };

//   return (
//     <div className="profile-page">
//       <h2>Welcome Back, {username}!</h2>

//       <div className="create-buttons">
//         <FridgeForm ownerId={profileId} onFridgeCreated={handleFridgeCreated} />
//         <MeatForm ownerId={profileId} onMeatCreated={handleMeatCreated} />
//       </div>

//       <div className="temperatures-container">
//         <div className="fridges-container">
//           <h4>Fridges Temperatures</h4>
//           <div className="fridges-row">
//             {fridges.map((fridge) => (
//               <div key={fridge.id} className="fridge-box">
//                 <h4>Fridge Number: {fridge.fridgeNumber}</h4>
//                 <p>Temperature: {fridge.temperature}</p>
//                 <p>Date: {fridge.date}</p>

//                 <label>Review Your Fridge:</label>
//                 <input
//                   type="text"
//                   className="review-input"
//                   value={fridgeReviewText[fridge.id] || ''}
//                   onChange={(e) => setFridgeReviewText((prev) => ({ ...prev, [fridge.id]: e.target.value }))}
//                 />

//                 <button className="common-button" onClick={() => handleReviewFridge(fridge.id, fridgeReviewText[fridge.id])}>
//                   Review This Fridge
//                 </button>

//                 <button className="common-button" onClick={() => handleDeleteFridge(fridge.id)}>
//                   Delete Fridge
//                 </button>

//                 <ul>
//                   {reviews
//                     .filter((review) => review.fridge === fridge.id)
//                     .map((review) => (
//                       <li key={review.id}>
//                         Review: {review.text}
//                         <button className="common-button" onClick={() => handleDeleteReview(review.id)}>
//                           Delete
//                         </button>
//                       </li>
//                     ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="meats-container">
//           <h4>Meats Temperatures</h4>
//           <div className="meats-row">
//             {meats.map((meat) => (
//               <div key={meat.id} className="meats-box">
//                 {editableMeatId === meat.id ? (
//                   <div>
//                     <label>Meat Name:</label>
//                     <input
//                       type="text"
//                       value={updatedMeatData.meatName}
//                       onChange={(e) => setUpdatedMeatData((prev) => ({ ...prev, meatName: e.target.value }))}
//                     />
//                     <label>Temperature:</label>
//                     <input
//                       type="text"
//                       value={updatedMeatData.temperature}
//                       onChange={(e) => setUpdatedMeatData((prev) => ({ ...prev, temperature: e.target.value }))}
//                     />
//                     <button className="common-button" onClick={() => handleUpdateMeat(meat.id, updatedMeatData)}>
//                       Update Meat
//                     </button>
//                   </div>
//                 ) : (
//                   <div>
//                     <p>Meat Name: {meat.meatName}</p>
//                     <p>Temperature: {meat.temperature}</p>
//                     <button className="common-button" onClick={() => setEditableMeatId(meat.id)}>
//                       Edit Meat
//                     </button>
//                     <button className="common-button" onClick={() => handleDeleteMeat(meat.id)}>
//                       Delete Meat
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { activeUser } from '../utilities/helpers/common';
import FridgeForm from './FridgeForm';
import MeatForm from './MeatForm';

import '../styles/components/Profile.scss'

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
            'Authorization': `Bearer ${token}`,
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
          'Authorization': `Bearer ${token}`,
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
          'Authorization': `Bearer ${token}`,
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
          'Authorization': `Bearer ${token}`,
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

      // Send a PATCH or PUT request to update the meat record
      await axios.patch(`http://localhost:8000/api/meats/${formattedMeatId}/`, updatedData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Meat record updated successfully:', meatId);

      // Fetch updated meats data to refresh the UI
      const updatedMeatsResponse = await axios.get(`http://localhost:8000/api/meats/?owner=${profileId}`);
      setMeats(updatedMeatsResponse.data);

      setEditableMeatId(null);
      setUpdatedMeatData({
        meatName: '',
        temperature: '', // Reset the updated data
      });
    } catch (error) {
      console.error('Error updating meat record:', error.message);
      // Handle error as needed
      // For example, you can show a user-friendly error message
      // setErrorState('Failed to update meat record. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading...</p>; // You can customize the loading indicator here
  }

  return (
    <div className="profile-page">
      <h2>Welcome Back, {username}!</h2>

      <div className="create-buttons">
        <FridgeForm ownerId={profileId} onFridgeCreated={handleFridgeCreated} />
        <MeatForm ownerId={profileId} onMeatCreated={handleMeatCreated} />
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

















