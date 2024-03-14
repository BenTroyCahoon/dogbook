
// import './styles.css';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Start from './Start'; // Make sure the path to your Start component is correct
import Create from './Create'
import Profile from './Profile'
import Edit from './Edit';

function App() {
  const [page, setPage] = useState('Start');
  const [dog, setDog] = useState({})
  const [dogs, setDogs] = useState([])
  
  useEffect(() => {
    async function fetchDogs() {
      try {
        const response = await axios.get('http://localhost:3000/dogs');
        setDogs(response.data);


      } catch (error) {
          console.error('Error fetching dogs:', error);
          
      }
    }

    fetchDogs();
  }, []);

console.log(dog.name)


  switch (page) {
    case 'Start':
      return <Start setDog={setDog} setPage={setPage} dogs={dogs} />;
    case 'Profile':
      return <Profile dog={dog} setPage={setPage}  />;
    case 'Create':
      return <Create setPage={setPage} setDogs={setDogs} />; 
    case 'Edit':
      return <Edit dog={dog} setPage={setPage} setDogs={setDogs} />
    default:
      return <Start />

  }
}

export default App;
