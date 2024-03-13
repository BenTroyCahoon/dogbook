import React from "react"
import { useState } from "react"
import axios from "axios"


const Profile = ({ setPage, dog }) => {
    
    function changePage(event) {
        event.preventDefault()
       setPage('Start')
    }  
    return (
        <>
            <h1>Hundarnas profiler</h1>
            <h1>Tjena fan {dog.name}</h1>
  
             
            <div>
             <p><strong>Name:</strong> {dog.name}</p>
             <p><strong>Nickname:</strong> {dog.nickname}</p>
             <p><strong>Age:</strong> {dog.age}</p>
             <p><strong>Breed:</strong> {dog.breed}</p>
                <p><strong>temperament:</strong> {dog.temperament}</p>
                <p><strong>Info:</strong> {dog.preference}</p>
           </div>

            <button onClick={changePage}>Go back </button>
        </>
    )
}


export default Profile