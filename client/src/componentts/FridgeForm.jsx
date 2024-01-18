import { useState } from 'react';
import axios from 'axios';

const FridgeForm = ({ ownerId, onFridgeCreated }) => {
  const [fridgeNumber, setFridgeNumber] = useState('');
  const [temperature, setTemperature] = useState('');
  const [date, setDate] = useState('');
  const [reviewText] = useState(''); // New state for review text

  const handleCreateFridge = async () => {
    try {
      const token = localStorage.getItem('SEI-76-KITCHEN-TOKEN');
      
      // Step 1: Create the fridge
      const fridgeResponse = await axios.post(
        'http://localhost:8000/api/fridges/',
        {
          fridgeNumber,
          temperature,
          date,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Fridge created successfully:', fridgeResponse.data);
  
      // Step 2: Add a review to the created fridge only if review text is provided
      if (reviewText) {
        const reviewResponse = await axios.post(
          `http://localhost:8000/api/fridges/${fridgeResponse.data.id}/reviews/`,
          {
            text: reviewText,
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        console.log('Review added successfully:', reviewResponse.data);
      }
  
      // Trigger the callback to update the state with the newly created fridge
      onFridgeCreated(fridgeResponse.data);
    } catch (error) {
      console.error('Error creating fridge:', error.message);
    }
  };

  return (
    <div>
      <h2>Create Fridge</h2>
      <form>
        <label>Fridge Number:</label>
        <input
          type="number"
          value={fridgeNumber}
          onChange={(e) => setFridgeNumber(e.target.value)}
        />
        <label>Temperature:</label>
        <input
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="button" onClick={handleCreateFridge}>
          Create Fridge
        </button>
      </form>
    </div>
  );
};

export default FridgeForm;










