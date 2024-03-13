
// import { useState } from 'react'
//import Profile from './Profile'
import Start from './Start'; // Make sure the path to your Start component is correct
// import './styles.css';
import React, { useState,useEffect } from 'react';
import axios from 'axios';

function App() {
  const [page, setPage] = useState('Start');
  const [dog, setDog] = useState(null)
  


  




  switch (page) {
    case 'Start':
      return <Start setDog={setDog} setPage={setPage}  />;
    case 'Profile':
      return <Profile dog={dog} setPage={setPage} />;
    default:
      return <Start />

  }
}

export default App;
