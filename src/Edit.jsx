
import React, { useState, useEffect } from 'react';


const Edit = ({setPage, setDogs, dog, dogs}) => {

    const [name, setName] = useState(dog.name);
  const [age, setAge] = useState(dog.age);
  const [gender, setGender] = useState(dog.gender);
  const [temperament, setTemperament] = useState(dog.temperament);
  const [preference, setPreference] = useState(dog.preference);
  const [nickname, setNickname] = useState(dog.nickname); 
    const [presence, setPresence] = useState(dog.presence); 
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
              nickname,
              presence, 
          
            }),
            
          });
    
          if (response.ok) {
            console.log('Changes saved successfully!');
            const updatedDog = await response.json();
            setDogs((oldDogs) => oldDogs.map(dog => dog._id === updatedDog._id ? updatedDog : dog))
            setPage("Start")
            
          } else {
            console.error('Failed to edit profile');
           
          }
        } catch (error) {
          console.error('Error saving dog profile:', error);

        }
      };
    

      useEffect(() => {
        setPresence(dog.presence); 
    }, [dog.presence])


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
          <input type="checkbox" id="presence" checked={presence} onChange={(e) => setPresence(e.target.checked)} />
          
      <button type="submit">Save changes</button>
            </form>   
        </>
    )
}


export default Edit