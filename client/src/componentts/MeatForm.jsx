
import { useState } from 'react';
import axios from 'axios';

const MeatForm = ({ ownerId, onMeatCreated }) => {
  const [meatName, setMeatName] = useState('');
  const [temperature, setTemperature] = useState('');

  const handleCreateMeat = async () => {
    try {
      const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');

      // Step 1: Create the meat
      const meatResponse = await axios.post(
        'http://localhost:8000/api/meats/',
        {
          meatName,
          temperature,
          owner: ownerId, // Assuming ownerId is already a valid number
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Meat created successfully:', meatResponse.data);

      // Trigger the callback to update the state with the newly created meat
      onMeatCreated(meatResponse.data);

      // Clear the form fields after successful creation
      setMeatName('');
      setTemperature('');
    } catch (error) {
      console.error('Error creating meat:', error.message);
      if (error.response && error.response.status === 400) {
        console.log('Validation errors:', error.response.data);
      }
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
          type="text"
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




