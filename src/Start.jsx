
import React, { useState,useEffect } from 'react';
import axios from 'axios';


const Start = ({setPage}) => {
  
    const [dogs, setDogs] = useState([])
  const [dogImages, setDogImages] = useState([]); // Lägg till state för bild (URL)
  
  console.log(dogs)
   

  function changePage(event) {
    event.preventDefault()
    setPage('Create')
    console.log("1")
}  
    
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
    
    
    




  return (
    <div>
 <button onClick={()=>setPage('Create')}>Create Dog</button>
      <h2>Dogs List</h2>
        <ul>
          {dogs.map((dog, index)=> (
            <li key={dog._id}>
              <img src={dogImages} alt="Dog" />
              <div>
                <p><strong>Name:</strong> {dog.name}</p>
                <p><strong>Nickname:</strong> {dog.nickname}</p>
                <p><strong>Age:</strong> {dog.age}</p>
                <p><strong>Breed:</strong> {dog.breed}</p>
                <p><strong>Info:</strong> {dog.info}</p>
              </div>
            </li>
          ))}
        
      
        </ul>
      
      </div>
  );
};



export default Start;
