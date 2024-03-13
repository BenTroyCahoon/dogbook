
// import './styles.css';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Start from './Start'; // Make sure the path to your Start component is correct
import Create from './Create'
import Profile from './Profile'

function App() {
  const [page, setPage] = useState('Start');
  const [dog, setDog] = useState([])
  const [dogs, setDogs] = useState([])
  
  useEffect(() => {
    async function fetchDogs() {
      try {
        const response = await axios.get('http://localhost:3000/dogs');
        setDogs(response.data);


        const res = await axios.get('https://dog.ceo/api/breeds/image/random');
      setDogImages(res.data.message) ; // Return the URL of the random dog image
//         const images = await Promise.all(response.data.map(fetchDogImage));
// setDogImages()

      } catch (error) {
          console.error('Error fetching dogs:', error);
          
      }
    }

    fetchDogs();
  }, []);




  switch (page) {
    case 'Start':
      return <Start setDog={setDog} setPage={setPage} dogs={dogs} />;
    case 'Profile':
      return <Profile dog={dog} setPage={setPage}  />;
    case 'Create':
      return <Create setPage={setPage} />;
     default:
      return <Start />

  }
}

export default App;
