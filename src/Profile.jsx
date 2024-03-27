import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ setPage, dog, setId }) => {
  const [dogImage, setDogImage] = useState("");
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hämta hundens uppgifter och vännerna från servern
        const response = await axios.get(
          `http://localhost:3000/dogs/${dog._id}`
        );
        setFriends(response.data.friends);
        const responseImg = await axios.get(
          "https://dog.ceo/api/breeds/image/random"
        );
        setDogImage(responseImg.data.message); // Sätt URL:n för den slumpmässiga hundbilden
      } catch (error) {
        console.error("Error fetching dog profile:", error);
      }
    };
    fetchData();
  }, [dog._id]);

  function changePage(event) {
    event.preventDefault();
    setPage("Start");
    setId(dog._id);
  }

  function editDog(event) {
    event.preventDefault();
    setPage("Edit");
  }
  return (
    <div>
      <button onClick={changePage}>Go to Start</button>
      <button onClick={editDog}>Edit Dog</button>
      <h1>{dog.name} sida!</h1>

      {/* Visa den slumpmässiga hundbilden */}
      {dogImage && <img className="dog-image" src={dogImage} alt="Dog" />}

      <div>
        <p>
          <strong>Name:</strong> {dog.name}
        </p>
        <p>
          <strong>Nickname:</strong>
          {dog.nickname}
        </p>
        <p>
          <strong>Age:</strong> {dog.age}
        </p>
        <p>
          <strong>Breed:</strong> {dog.breed}
        </p>
        <p>
          <strong>Temperament:</strong> {dog.temperament}
        </p>
        <p>
          <strong>Preferences:</strong> {dog.preference}
        </p>

        <p>{dog.presence ? "Present" : "Not Present"}</p>
        <h2>Friends:</h2>
        <ul>
          {friends.map((friend) => (
            <li key={friend._id}>{friend.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
