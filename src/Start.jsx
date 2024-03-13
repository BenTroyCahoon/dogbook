
import React, { useState,useEffect } from 'react';
import axios from 'axios';


const Start = ({ setPage, setDog, dogs }) => {

//  const [dogs, setDogs] = useState([])
  // const [dogImages, setDogImages] = useState([]); // Lägg till state för bild (URL)

   

  // function changePage(event) {
  //   event.preventDefault()
   
  //   setPage('Start')
   
   
  //   console.log("1")
// }  
    

    
    
return (
    <div>
 <button onClick={()=>setPage('Create')}>Create Dog</button>
      <h2>Dogs List</h2>
        <ul>
          {dogs.map((dog, index)=> (
            <a key={index} onClick={() => { setPage('Profile'); setDog(dog) }}><li >
           {/* <img src={dogImages} alt="Dog" /> */}
           <div>
             <p><strong>Name:</strong> {dog.name}</p>
             {/* <p><strong>Nickname:</strong> {dog.nickname}</p>
             <p><strong>Age:</strong> {dog.age}</p>
             <p><strong>Breed:</strong> {dog.breed}</p>
             <p><strong>Info:</strong> {dog.info}</p> */}
           </div>
         </li></a> 
          ))}
        
      
        </ul>
      
      </div>
  );
};



export default Start;
