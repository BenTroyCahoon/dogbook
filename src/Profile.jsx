import React from "react"
import { useState,useEffect } from "react"
import axios from "axios"


const Profile = ({ setPage, dog }) => {
    const [dogImage, setDogImage] = useState('');
  
    useEffect(() => {
      // Funktion för att hämta en slumpmässig hundbild
      const fetchRandomDogImage = async () => {
        try {
          const response = await axios.get('https://dog.ceo/api/breeds/image/random');
          setDogImage(response.data.message); // Sätt URL:n för den slumpmässiga hundbilden
        } catch (error) {
          console.error('Error fetching dog image:', error);
        }
      };
  
      // Anropa funktionen för att hämta en slumpmässig hundbild när komponenten mountas
      fetchRandomDogImage();
    }, []); // Tomt beroende, körs en gång när komponenten mountas
  
    function changePage(event) {
      event.preventDefault();
      setPage('Start');
    }
  
    function editDog(event) {
        event.preventDefault();
        setPage('Edit');
      }



    return (
      <div>
        <button onClick={changePage}>Go to Start</button>
  <button onClick={editDog}>Edit Dog</button>
        <h1>{dog.name} sida!</h1>
  
        {/* Visa den slumpmässiga hundbilden */}
        {dogImage && <img className="dog-image" src={dogImage} alt="Dog" />}
  
        <div>
          <p><strong>Name:</strong> {dog.name}</p>
          <p><strong>Nickname:</strong>{dog.nickname}</p>
          <p><strong>Age:</strong> {dog.age}</p>
          <p><strong>Breed:</strong> {dog.breed}</p>
                <p><strong>Temperament:</strong> {dog.temperament}</p>
                <p><strong>Preferences:</strong> {dog.preference}</p>
  
          <p >{dog.presence ? "Present" : "Not Present"}</p>
        </div>
      </div>
    );
  };
  

  export default Profile