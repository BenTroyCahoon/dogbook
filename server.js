import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());
const PORT = 3000;
app.use(express.json());

async function start() {
  try {
    await mongoose.connect("mongodb://localhost:27017/dogbook");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

const dogsDataSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  isNeutered: String,
  gender: String,
  temperament: String,
  preference: String,
  nickname: String, // Lägg till attributet för nickname
  presence: String, // Lägg till attributet för presence
  // image: String // Lägg till attributet för bild (du kan också lagra bildens URL)
});

const Dog = mongoose.model("Dog", dogsDataSchema);

app.post("/addDogProfile", async (req, res) => {
  const {
    name,
    age,
    gender,
    temperament,
    preference,
    nickname,
    presence,
    breed,
  } = req.body;

  try {
    const newDog = new Dog({
      name,
      age,
      gender,
      temperament,
      preference,
      nickname,
      presence,
      breed,
    });
    await newDog.save();
    console.log(newDog);
    console.log("Dog profile added successfully!");
    res.status(201).json(newDog);
  } catch (error) {
    console.error("Error adding dog profile:", error);
    res.status(500).send("Failed to add dog profile.");
  }
});

app.get("/dogs", async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.status(200).json(dogs);
  } catch (error) {
    console.error("fetching went to shit");
  }
});

// app.post("/edit/:id", async (req, res) => {
//   const {id} = req.params.id
//   const {
//     name,
//     age,
//     gender,
//     temperament,
//     preference,
//     nickname,
//     presence,
//     breed,
//   } = req.body;

//   try {
//     const newDog = new Dog({
//       name,
//       age,
//       gender,
//       temperament,
//       preference,
//       nickname,
//       presence,
//       breed,
//     });
//     await newDog.save();
//     console.log("Dog profile added successfully!");
//     res.status(201).send("Dog profile added successfully!");
//   } catch (error) {
//     console.error("Error adding dog profile:", error);
//     res.status(500).send("Failed to add dog profile.");
//   }
// });

app.put("/dogs/:id", async (req, res) => {
  const { id } = req.params; // Hämta ID från URL-parametern
  const {
    name,
    age,
    gender,
    temperament,
    preference,
    nickname,
    presence,
    breed,
  } = req.body;

  try {
    // Hitta hunden med det angivna ID:t och uppdatera dess attribut
    const updatedDog = await Dog.findByIdAndUpdate(
      id,
      {
        name,
        age,
        gender,
        temperament,
        preference,
        nickname,
        presence,
        breed,
      },
      { new: true }
    ); // Använd { new: true } för att få det uppdaterade objektet tillbaka

    if (!updatedDog) {
      // Om hunden inte hittades med det angivna ID:t
      return res.status(404).send("Dog not found");
    }

    console.log("Dog profile updated successfully!");
    res.status(200).json(updatedDog);
  } catch (error) {
    console.error("Error updating dog profile:", error);
    res.status(500).send("Failed to update dog profile.");
  }
});

start();
