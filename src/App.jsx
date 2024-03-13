
// import { useState } from 'react'
//import Profile from './Profile'
import Start from './Start'; // Make sure the path to your Start component is correct
// import './styles.css';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Create from './Create'
import Profile from './Profile'

function App() {
  const [page, setPage] = useState('Start');
  const [dog, setDog] = useState(null)
  


  
  console.log(page)



  switch (page) {
    case 'Start':
      return <Start setDog={setDog} setPage={setPage} dog={dog} />;
    case 'Profile':
      return <Profile dog={dog} setPage={setPage}  />;
    case 'Create':
      return <Create dog={dog} setPage={setPage} />;
      
    default:
      return <Start />

  }
}

export default App;
