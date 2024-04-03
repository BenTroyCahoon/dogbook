import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const [dogImage, setDogImage] = useState("");
  const [dog, setDog] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams(); // plocka fram id från url

  useEffect(() => {
    const fetchData = async () => {
      // Kontrollera att dog och _id är definierade
      try {
        // Hämta hundens uppgifter och vännerna från servern
        const response = await axios.get(`http://localhost:3000/dogs/${id}`);
        setDog(response.data);
        //setFriends(response.data.friends);
        const responseImg = await axios.get(
          "https://dog.ceo/api/breeds/image/random"
        );
        setDogImage(responseImg.data.message);
      } catch (error) {
        console.error("Error fetching dog profile:", error);
      }
    };
    fetchData();
  }, []); // Endast kör effekten när dog ändras

  // function changePage(event) {
  //   event.preventDefault();
  //   setPage("Start");
  //   setId(dog._id);
  // }

  // function editDog(event) {
  //   event.preventDefault();
  //   setPage("Edit");
  // }
  if (dog === null) {
    return (
      <div>
        <h1>Loading dogs</h1>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={() => navigate("/")}>Go to Start</button>
        <button onClick={() => navigate(`/edit/${dog._id}`)}>Edit Dog</button>
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
            {dog.friends.map((friend) => (
              <li key={friend._id}>{friend.name}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default Profile;
