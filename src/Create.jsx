// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Create = () => {
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [temperament, setTemperament] = useState("");
//   const [preference, setPreference] = useState("");
//   const [nickname, setNickname] = useState(""); // Lägg till state för nickname
//   const [presence, setPresence] = useState(false); // Lägg till state för presence
//   const [breed, setBreed] = useState("");
//   const [selectedFriends, setSelectedFriends] = useState([]);
//   const [dogs, setDogs] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchDogs() {
//       try {
//         const response = await axios.get("http://localhost:3000/dogs");
//         setDogs(response.data);
//       } catch (error) {
//         console.error("error fetching dogs", error);
//       }
//     }
//     fetchDogs();
//   }, []);

//   const handleCheckBoxhange = (event) => {
//     const { checked, value } = event.target;
//     if (checked) {
//       setSelectedFriends((prevSelectedFriends) => [
//         ...prevSelectedFriends,
//         value,
//       ]);
//     } else {
//       setSelectedFriends((prevSelectedFriends) =>
//         prevSelectedFriends.filter((friendId) => friendId !== value)
//       );
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const filteredSelectedFriends = selectedFriends.filter(
//       (friendId) => friendId !== id
//     );

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/dogs/addDogProfile",
//         {
//           name,
//           age,
//           breed,
//           gender,
//           temperament,
//           preference,
//           nickname, // Lägg till nickname i den POST-förfrågan
//           presence,
//           friends: filteredSelectedFriends, // Lägg till presence i den POST-förfrågan
//         }
//       );

//       // if (response.ok)
//       if (response.status === 201) {
//         const newDog = response.data;
//         console.log("Dog profile added successfully!");
//         navigate("/");
//         console.log(newDog);
//         // setDogs((oldDogs) => [...oldDogs, newDog]);
//         // setPage("Start");
//         // Lägg till eventuellt annat beteende för att indikera att hundprofilen har lagts till
//       } else {
//         console.error("Failed to add dog profile");
//         // Lägg till eventuellt annat beteende för att indikera att det inte gick att lägga till hundprofilen
//       }
//     } catch (error) {
//       console.error("Error adding dog profile:", error);
//       // Lägg till eventuellt annat beteende för att hantera fel
//     }
//   };

//   // function changePage(event) {
//   //   event.preventDefault();
//   //   setPage("Start");

//   return (
//     <>
//       <button onClick={() => navigate("/")}>Back to Start</button>
//       <h1>CREATE PAGE</h1>

//       <form onSubmit={handleSubmit}>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <label htmlFor="age">Age:</label>
//         <input
//           type="number"
//           id="age"
//           value={age}
//           onChange={(e) => setAge(e.target.value)}
//         />
//         <label>
//           Gender:
//           <select value={gender} onChange={(e) => setGender(e.target.value)}>
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>
//         </label>
//         <label htmlFor="temperament">Temperament:</label>
//         <input
//           type="text"
//           id="temperament"
//           value={temperament}
//           onChange={(e) => setTemperament(e.target.value)}
//         />
//         <label htmlFor="breed">breed:</label>
//         <input
//           type="text"
//           id="breed"
//           value={breed}
//           onChange={(e) => setBreed(e.target.value)}
//         />
//         <label htmlFor="preference">Preference:</label>
//         <input
//           type="text"
//           id="preference"
//           value={preference}
//           onChange={(e) => setPreference(e.target.value)}
//         />
//         <label htmlFor="nickname">Nickname:</label>{" "}
//         {/* Lägg till fält för nickname */}
//         <input
//           type="text"
//           id="nickname"
//           value={nickname}
//           onChange={(e) => setNickname(e.target.value)}
//         />
//         <label htmlFor="presence">Presence:</label> Lägg till fält för presence
//         <input type="text" id="presence" value={presence} onChange={(e) => setPresence(e.target.value)} />         <label htmlFor="presence">Presence:</label>
//         <input
//           onChange={(e) => setPresence(e.target.checked)}
//           type="checkbox"
//           name="present"
//           id="presence"
//         />
//         <fieldset>
//           <legend>Select friends:</legend>
//           {dogs.map((Dogfriend) => (
//             <div key={Dogfriend._id}>
//               <input
//                 type="checkbox"
//                 id={Dogfriend._id}
//                 value={Dogfriend._id}
//                 checked={selectedFriends.includes(Dogfriend._id)}
//                 onChange={handleCheckBoxhange}
//               />
//               <label htmlFor={Dogfriend._id}>{Dogfriend.name}</label>
//             </div>
//           ))}
//         </fieldset>
//         <button type="submit">Add Dog Profile</button>
//       </form>
//     </>
//   );
// };

// export default Create;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [temperament, setTemperament] = useState("");
  const [preference, setPreference] = useState("");
  const [nickname, setNickname] = useState("");
  const [presence, setPresence] = useState(false);
  const [breed, setBreed] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [dogs, setDogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDogs() {
      try {
        const response = await axios.get("http://localhost:3000/dogs");
        setDogs(response.data);
      } catch (error) {
        console.error("Error fetching dogs", error);
      }
    }
    fetchDogs();
  }, []);

  const handleCheckBoxChange = (event) => {
    const { checked, value } = event.target;
    if (checked && !selectedFriends.includes(value)) {
      setSelectedFriends((prevSelectedFriends) => [
        ...prevSelectedFriends,
        value,
      ]);
    } else if (!checked && selectedFriends.includes(value)) {
      setSelectedFriends((prevSelectedFriends) =>
        prevSelectedFriends.filter((friendId) => friendId !== value)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/dogs/addDogProfile",
        {
          name,
          age,
          breed,
          gender,
          temperament,
          preference,
          nickname,
          presence,
          friends: selectedFriends,
        }
      );

      if (response.status === 201) {
        console.log("Dog profile added successfully!");
        navigate("/");
      } else {
        console.error("Failed to add dog profile");
      }
    } catch (error) {
      console.error("Error adding dog profile:", error);
    }
  };

  return (
    <>
      <button onClick={() => navigate("/")}>Back to Start</button>
      <h1>CREATE PAGE</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="age">Age:</label>
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
        <label htmlFor="breed">Breed:</label>
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
        <label htmlFor="nickname">Nickname:</label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <label htmlFor="presence">Presence:</label>
        <input
          type="checkbox"
          id="presence"
          checked={presence}
          onChange={(e) => setPresence(e.target.checked)}
        />
        <fieldset>
          <legend>Select friends:</legend>
          {dogs.map((dog) => (
            <div key={dog._id}>
              <input
                type="checkbox"
                id={dog._id}
                value={dog._id}
                checked={selectedFriends.includes(dog._id)}
                onChange={handleCheckBoxChange}
              />
              <label htmlFor={dog._id}>{dog.name}</label>
            </div>
          ))}
        </fieldset>
        <button type="submit">Add Dog Profile</button>
      </form>
    </>
  );
};

export default Create;
