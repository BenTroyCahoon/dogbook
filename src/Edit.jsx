import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const [dogs, setDogs] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [temperament, setTemperament] = useState("");
  const [preference, setPreference] = useState("");
  const [nickname, setNickname] = useState("");
  const [presence, setPresence] = useState(false);
  const [breed, setBreed] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      // Kontrollera att dog och _id är definierade
      try {
        // Hämta hundens uppgifter och vännerna från servern
        const response = await axios.get(`http://localhost:3000/dogs/${id}`);
        setName(response.data.name);
        setGender(response.data.gender);
        setAge(response.data.age);
        setNickname(response.data.nickname);
        setPreference(response.data.preference);
        setTemperament(response.data.temperament);
        setSelectedFriends(response.data.friends.map((friend) => friend._id));
        // setFriends(response.data.friends);
      } catch (error) {
        console.error("Error fetching dog profile:", error);
      }
    };
    fetchData();
  }, []); // Endast kör effekten när dog ändras

  useEffect(() => {
    const fetchData = async () => {
      // Kontrollera att dog och _id är definierade
      try {
        // Hämta hundens uppgifter och vännerna från servern
        const response = await axios.get(`http://localhost:3000/dogs/`);
        setDogs(response.data);
      } catch (error) {
        console.error("Error fetching dog profile:", error);
      }
    };
    fetchData();
  }, []);

  const handleCheckBoxhange = (event) => {
    const { checked, value } = event.target;
    console.log(checked, value);
    if (checked) {
      setSelectedFriends((prevSelectedFriends) => [
        ...prevSelectedFriends,
        value,
      ]);
    } else {
      setSelectedFriends((prevSelectedFriends) =>
        prevSelectedFriends.filter((friendId) => friendId !== value)
      );
    }
  };

  // useEffect(() => {
  //   setSelectedFriends(dog.friends || []);

  // }, [dog.friends])

  const handleSubmit = async (e) => {
    console.log(" inne i submit");

    e.preventDefault();
    const filteredSelectedFriends = selectedFriends.filter(
      (friendId) => friendId !== id
    );
    try {
      const response = await axios.put(
        `http://localhost:3000/dogs/edit/${id}`,
        {
          name,
          age,
          breed,
          gender,
          temperament,
          preference,
          nickname,
          presence,
          friends: filteredSelectedFriends,
        }
      );
      if (response.status === 200) {
        alert("Changes saved successfully!");
        navigate(`/profile/${id}`);
      } else {
        console.error("Failed to edit profile");
      }
    } catch (error) {
      console.error("Error saving dog profile:", error);
    }
  };

  // useEffect(() => {
  //   setPresence(dog.presence);
  // }, [dog.presence]);

  return (
    <>
      <button onClick={() => navigate("/")}>Back to Start</button>
      <h1>EDIT PAGE</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Change name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="age">change age:</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label>
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label htmlFor="temperament">Temperament:</label>
        <input
          type="text"
          id="temperament"
          value={temperament}
          onChange={(e) => setTemperament(e.target.value)}
        />
        <label htmlFor="breed">Change breed:</label>
        <input
          type="text"
          id="breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <label htmlFor="preference">Preference:</label>
        <input
          type="text"
          id="preference"
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
        />
        <label htmlFor="nickname">Change nick:</label>{" "}
        {/* Lägg till fält för nickname */}
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <label htmlFor="presence">Present?:</label>{" "}
        {/* Lägg till fält för presence */}
        <input
          type="checkbox"
          id="presence"
          checked={presence}
          onChange={(e) => setPresence(e.target.checked)}
        />
        <fieldset>
          <legend>Select Friends:</legend>
          {dogs
            .filter((Dogfriend) => Dogfriend._id !== id)
            .map((Dogfriend) => (
              <div key={Dogfriend._id}>
                <input
                  type="checkbox"
                  id={Dogfriend._id}
                  value={Dogfriend._id}
                  checked={selectedFriends.includes(Dogfriend._id)}
                  onChange={handleCheckBoxhange}
                />
                <label htmlFor={Dogfriend._id}>{Dogfriend.name}</label>
              </div>
            ))}
        </fieldset>
        <button type="submit">Save changes</button>
      </form>
    </>
  );
};

export default Edit;
