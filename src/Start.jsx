import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Start = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const getDogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/dogs");
        setDogs(response.data);
      } catch (error) {
        console.error("Error fetching dogs:", error);
      }
    };
    getDogs();
  }, []);

  const removeDog = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/dogs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // setDog(dogs.filter((dog) => dog._id !== id));
        alert("Dog removed successfully!");
        console.log("Dogs changed:", dogs); // Logga ändring i hundar
        // setDogsChanged(true);
        console.log("Dogs changed set to true"); // Logga att hundarna har ändrats
      } else {
        alert("Failed to remove dog.");
      }
    } catch (error) {
      console.error("Error removing dog:", error);
      alert("Failed to remove dog.");
    }
  };
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/create")}>Create Dog</button>
      <h2>Dogs List</h2>

      <ul>
        {dogs.map((dog) => (
          <li
            key={dog._id}
            style={{ cursor: "pointer" }}
            // onClick={() => {
            //   setPage("Profile");
            //   setDog(dog);
            // }}
          >
            <Link
              to={`/profile/${dog._id}`}
              style={{ color: dog.presence ? "green" : "red" }}
            >
              <strong>Name:</strong> {dog.name}
            </Link>
            <button
              onClick={() => {
                console.log("Removing dog:", dog._id); // Logga id för hunden som tas bort
                removeDog(dog._id);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Start;
