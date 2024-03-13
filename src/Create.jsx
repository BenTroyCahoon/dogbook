const Create = () => {
    return (
        <>
          <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      
      <label htmlFor="age">Age:</label>
      <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
      

   
      
      <label>
        Gender:
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      
      <label htmlFor="temperament">Temperament:</label>
          <input type="text" id="temperament" value={temperament} onChange={(e) => setTemperament(e.target.value)} />
          

          <label htmlFor="breed">breed:</label>
      <input type="text" id="breed" value={breed} onChange={(e) => setBreed(e.target.value)} />
      
      <label htmlFor="preference">Preference:</label>
      <input type="text" id="preference" value={preference} onChange={(e) => setPreference(e.target.value)} />
      
      <label htmlFor="nickname">Nickname:</label> {/* Lägg till fält för nickname */}
      <input type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      
      <label htmlFor="presence">Presence:</label> {/* Lägg till fält för presence */}
      <input type="text" id="presence" value={presence} onChange={(e) => setPresence(e.target.value)} />
      
      
      <button type="submit">Add Dog Profile</button>
          {/* <ul>
          {dogs.map((dog) => (
    <li key={dog._id}>{dog.name}, {dog.age}</li>
))}
                </ul> */}
      
      
      
      </form>
        </>
    )
}


export default Create