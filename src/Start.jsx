import React, { useState, useEffect } from "react";


const Start = ({ setPage, setDog, dogs, setDogs }) => {
    
  return (
    <div>
      <button onClick={() => setPage("Create")}>Create Dog</button>
      <h2>Dogs List</h2>

      <ul>
        {dogs.map((dog) => (
          <li key={dog._id}>
            <a
              onClick={() => {
                setPage("Profile");
                setDog(dog);
              }}
            >
              <p style={{ color: dog.presence ? "green" : "red" }}>
                <strong>Name:</strong> {dog.name}
              </p>
            </a>
            <button
              onClick={() =>
                setDogs([...dogs.slice(0, index), ...dogs.slice(index + 1)])
              }
            >
              Delete{" "}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Start;
