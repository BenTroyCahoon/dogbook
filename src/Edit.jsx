
import React, { useState, useEffect } from 'react';


const Edit = ({setPage, setDogs, dog}) => {

    const [name, setName] = useState(dog.name);
  const [age, setAge] = useState(dog.age);
  const [gender, setGender] = useState(dog.gender);
  const [temperament, setTemperament] = useState(dog.temperament);
  const [preference, setPreference] = useState(dog.preference);
  const [nickname, setNickname] = useState(dog.nickname); // Lägg till state för nickname
    const [presence, setPresence] = useState(dog.presence); // Lägg till state för presence
    const [breed, setBreed] = useState(dog.breed)

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const response = await fetch(`http://localhost:3000/dogs/${dog._id}`, {
            method: 'PUT',
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
            console.log('Changes saved successfully!');
            const updatedDog = await response.json();
            setDogs((oldDogs) => [...oldDogs, updatedDog])
            setPage("Start")
            // Lägg till eventuellt annat beteende för att indikera att hundprofilen har lagts till
          } else {
            console.error('Failed to edit profile');
            // Lägg till eventuellt annat beteende för att indikera att det inte gick att lägga till hundprofilen
          }
        } catch (error) {
          console.error('Error saving dog profile:', error);
          // Lägg till eventuellt annat beteende för att hantera fel
        }
      };
    


    function changePage(event) {
        event.preventDefault()
        setPage('Start')
        console.log("1")
}

    return (
        <>
            
            <button onClick={changePage}>Back to Start</button>
            <h1>EDIT PAGE</h1>
        
            
            <form onSubmit={handleSubmit}>
      <label htmlFor="name">Change name:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      
      <label htmlFor="age">change age:</label>
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
          

          <label htmlFor="breed">Change breed:</label>
      <input type="text" id="breed" value={breed} onChange={(e) => setBreed(e.target.value)} />
      
      <label htmlFor="preference">Preference:</label>
      <input type="text" id="preference" value={preference} onChange={(e) => setPreference(e.target.value)} />
      
      <label htmlFor="nickname">Change nick:</label> {/* Lägg till fält för nickname */}
      <input type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      
      <label htmlFor="presence">Present?:</label> {/* Lägg till fält för presence */}
      <input type="text" id="presence" value={presence} onChange={(e) => setPresence(e.target.value)} />
      
      
      <button type="submit">Save changes</button>
  
      
      
      
            </form>
            
           
        </>
    )
}


export default Edit