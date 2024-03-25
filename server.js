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
  nickname: String,
  presence: Boolean,

  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dog" }],
});

const Dog = mongoose.model("Dog", dogsDataSchema);

app.post("/dogs/addDogProfile", async (req, res) => {
  const {
    name,
    age,
    gender,
    temperament,
    preference,
    nickname,
    presence,
    isNeutered,
    breed,
    friends,
  } = req.body;
  console.log(req.body);
  try {
    const newDog = new Dog({
      name,
      age,
      gender,
      temperament,
      preference,
      isNeutered,
      nickname,
      presence,
      breed,
      friends,
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

app.delete("/dogs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDog = await Dog.findByIdAndDelete(id);
    if (!deletedDog) {
      return res.status(404).send("Dog not found");
    }
    console.log("Dog deleted successfully");
    res.status(200).send("Dog deleted successfully");
  } catch (error) {
    console.error("Error deleting dog:", error);
    res.status(500).send("Failed to delete dog");
  }
});

start();
