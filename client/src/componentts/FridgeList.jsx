import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FridgeList({ accessToken }) {
  const [fridges, setFridges] = useState([]);

  useEffect(() => {
    async function fetchFridges() {
      try {
        const response = await axios.get('http://localhost:8000/api/fridges/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log('Fridges data:', response.data); // Log for debugging
        setFridges(response.data);
      } catch (error) {
        console.error('Error fetching fridges:', error);
      }
    }

    fetchFridges();
  }, [accessToken]);

  return (
    <div>
      <h1>Fridge List</h1>
      <ul>
        {fridges.map(fridge => (
          <li key={fridge.id}>
            {fridge.fridgeNumber} - {fridge.temperature} ({fridge.date})
          </li>
        ))}
      </ul>
    </div>
  );
}
