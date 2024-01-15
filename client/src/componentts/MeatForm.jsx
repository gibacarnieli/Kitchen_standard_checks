// MeatForm.jsx
import { useState } from 'react';
import axios from 'axios';

const MeatForm = ({ ownerId, onMeatCreated }) => {
  const [meatName, setMeatName] = useState('');
  const [temperature, setTemperature] = useState('');

  const handleCreateMeat = async () => {
    try {
      // Retrieve the authentication token from your storage (e.g., local storage)
      const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN'); 

      const response = await axios.post(
        'http://localhost:8000/api/meats/',
        {
          meatName,
          temperature,
          owner: ownerId, 
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Meat created successfully:', response.data);

      // Notify the parent component (Profile.jsx) about the newly created meat
      onMeatCreated(response.data);

      // Optionally, you can handle success, e.g., show a success message
    } catch (error) {
      console.error('Error creating meat:', error.message);
      // Optionally, you can handle errors, e.g., show an error message
    }
  };

  return (
    <div>
      <h2>Create Meat</h2>
      <form>
        <label>Meat Name:</label>
        <input
          type="text"
          value={meatName}
          onChange={(e) => setMeatName(e.target.value)}
        />
        <label>Temperature:</label>
        <input
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
        <button type="button" onClick={handleCreateMeat}>
          Create Meat
        </button>
      </form>
    </div>
  );
};

export default MeatForm;
