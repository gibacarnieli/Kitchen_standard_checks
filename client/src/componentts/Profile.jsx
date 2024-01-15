// // Profile.jsx
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import FridgeForm from './FridgeForm';  // Import FridgeForm component
// import MeatForm from './MeatForm';  // Import MeatForm component

// const Profile = () => {
//   const [fridges, setFridges] = useState([]);
//   const [meats, setMeats] = useState([]);
//   const [profileId, setProfileId] = useState(null);

//   useEffect(() => {
//     // Fetch fridges and meats owned by the profile when the component mounts
//     const fetchProfileData = async () => {
//       try {
//         // Fetch fridges
//         const fridgesResponse = await axios.get(`http://localhost:8000/api/fridges/?owner=${profileId}`);
//         setFridges(fridgesResponse.data);

//         // Fetch meats
//         const meatsResponse = await axios.get(`http://localhost:8000/api/meats/?owner=${profileId}`);
//         setMeats(meatsResponse.data);
//       } catch (error) {
//         console.error('Error fetching profile data:', error.message);
//       }
//     };

//     fetchProfileData();
//   }, [profileId]);

//   const handleFridgeCreated = (newFridge) => {
//     // Add the newly created fridge to the list
//     setFridges((prevFridges) => [...prevFridges, newFridge]);
//   };

//   const handleMeatCreated = (newMeat) => {
//     // Add the newly created meat to the list
//     setMeats((prevMeats) => [...prevMeats, newMeat]);
//   };

//   return (
//     <div>
//       {/* Display profile information here */}
//       <h1>Profile Page</h1>

//       {/* Display the list of fridges */}
//       <h2>Fridges Owned:</h2>
//       <ul>
//         {fridges.map((fridge) => (
//           <li key={fridge.id}>
//             Fridge Number: {fridge.fridgeNumber}, Temperature: {fridge.temperature}, Date: {fridge.date}
//           </li>
//         ))}
//       </ul>

//       {/* Render FridgeForm with the profileId and callback for fridge creation */}
//       <FridgeForm ownerId={profileId} onFridgeCreated={handleFridgeCreated} />

//       {/* Display the list of meats */}
//       <h2>Meats Owned:</h2>
//       <ul>
//         {meats.map((meat) => (
//           <li key={meat.id}>
//             Meat Name: {meat.meatName}, Temperature: {meat.temperature}
//           </li>
//         ))}
//       </ul>

//       {/* Render MeatForm with the profileId and callback for meat creation */}
//       <MeatForm ownerId={profileId} onMeatCreated={handleMeatCreated} />
//     </div>
//   );
// };

// export default Profile;

// Profile.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import FridgeForm from './FridgeForm';
import MeatForm from './MeatForm';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Profile = () => {
  const [fridges, setFridges] = useState([]);
  const [meats, setMeats] = useState([]);
  const [profileId, setProfileId] = useState(null);
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const fridgesResponse = await axios.get(`http://localhost:8000/api/fridges/?owner=${profileId}`);
        setFridges(fridgesResponse.data);

        const meatsResponse = await axios.get(`http://localhost:8000/api/meats/?owner=${profileId}`);
        setMeats(meatsResponse.data);
      } catch (error) {
        console.error('Error fetching profile data:', error.message);
      }
    };

    fetchProfileData();
  }, [profileId]);

  const handleFridgeCreated = (newFridge) => {
    setFridges((prevFridges) => [...prevFridges, newFridge]);
  };

  const handleMeatCreated = (newMeat) => {
    setMeats((prevMeats) => [...prevMeats, newMeat]);
  };

  const handleLogout = () => {
    // Perform any logout logic here
    // ...

    // Navigate to the login page without preserving history
    navigate('/login', { replace: true });
  };

  return (
    <div>
      <h1>Profile Page</h1>

      <h2>Fridges Owned:</h2>
      <ul>
        {fridges.map((fridge) => (
          <li key={fridge.id}>
            Fridge Number: {fridge.fridgeNumber}, Temperature: {fridge.temperature}, Date: {fridge.date}
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


