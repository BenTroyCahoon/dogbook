// import './styles.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Start from "./Start"; // Make sure the path to your Start component is correct
import Create from "./Create";
import Profile from "./Profile";
import Edit from "./Edit";

function App() {
  // const [page, setPage] = useState("Start");
  // const [dog, setDog] = useState({});
  // const [dogs, setDogs] = useState([]);
  // const [id, setId] = useState("");

  // useEffect(() => {
  //   async function fetchDogs() {
  //     try {
  //       const response = await axios.get("http://localhost:3000/dogs");
  //       setDogs(response.data);
  //     } catch (error) {
  //       console.error("Error fetching dogs:", error);
  //     }
  //   }

  //   fetchDogs();
  // }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Start
              // setDog={setDog}
              // setPage={setPage}
              // dogs={dogs}
              // setDogs={setDogs}
            />
          }
        />
        <Route
          path="/create"
          element={<Create  />}
        />
        <Route
          path="/profile/:id"
          element={
            <Profile  />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <Edit
              // dog={dog}
              // setPage={setPage}
              // setDogs={setDogs}
              // dogs={dogs}
              // id={id}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
