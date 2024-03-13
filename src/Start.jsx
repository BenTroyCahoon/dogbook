
import React, { useState,useEffect } from 'react';
import axios from 'axios';


const Start = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [temperament, setTemperament] = useState('');
  const [preference, setPreference] = useState('');
  const [nickname, setNickname] = useState(''); // Lägg till state för nickname
    const [presence, setPresence] = useState(''); // Lägg till state för presence
    const [breed, setBreed] = useState('')
    const [dogs, setDogs] = useState([])
  const [dogImages, setDogImages] = useState([]); // Lägg till state för bild (URL)
  
  console.log(dogs)
   

  
    
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
    
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/addDogProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
            age,
          breed,
          gender,
          temperament,
          preference,
          nickname, // Lägg till nickname i den POST-förfrågan
          presence, // Lägg till presence i den POST-förfrågan
        //   image // Lägg till image i den POST-förfrågan
        }),
        
      });

      if (response.ok) {
        console.log('Dog profile added successfully!');
        // Lägg till eventuellt annat beteende för att indikera att hundprofilen har lagts till
      } else {
        console.error('Failed to add dog profile');
        // Lägg till eventuellt annat beteende för att indikera att det inte gick att lägga till hundprofilen
      }
    } catch (error) {
      console.error('Error adding dog profile:', error);
      // Lägg till eventuellt annat beteende för att hantera fel
    }
  };


const fetchDogImage = async () => {
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/image/random');
      return response.data.message; // Return the URL of the random dog image
    } catch (error) {
      console.error('Error fetching dog image:', error);
      return ''; // Return an empty string if there's an error
    }
  };


  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      
      <label htmlFor="age">Age:</label>
      <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
      

   
      
      <label>
        Gender:
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      
      <label htmlFor="temperament">Temperament:</label>
          <input type="text" id="temperament" value={temperament} onChange={(e) => setTemperament(e.target.value)} />
          

          <label htmlFor="breed">breed:</label>
      <input type="text" id="breed" value={breed} onChange={(e) => setBreed(e.target.value)} />
      
      <label htmlFor="preference">Preference:</label>
      <input type="text" id="preference" value={preference} onChange={(e) => setPreference(e.target.value)} />
      
      <label htmlFor="nickname">Nickname:</label> {/* Lägg till fält för nickname */}
      <input type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      
      <label htmlFor="presence">Presence:</label> {/* Lägg till fält för presence */}
      <input type="text" id="presence" value={presence} onChange={(e) => setPresence(e.target.value)} />
      
      
      <button type="submit">Add Dog Profile</button>
          {/* <ul>
          {dogs.map((dog) => (
    <li key={dog._id}>{dog.name}, {dog.age}</li>
))}
                </ul> */}
      
      
      
      </form>
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
