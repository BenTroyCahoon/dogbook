// import express from "express";
// import cors from "cors";
// // import bodyParser from "body-parser";
// import mongoose from "mongoose";

// const app = express();
// app.use(cors());
// const PORT = 3000;
// app.use(express.json());

// mongoose.connect("mongodb://localhost:27017/dogbook", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // mongoose.connect('mongodb+srv://carolinemagnenat:VinnacuppenAIK2024@ElsasHunddagis.anzh15y.mongodb.net/?retryWrites=true&w=majority&appName=ElsasHunddagis',

// // ).then(() => {
// //   console.log('Connected to MongoDB');
// // }).catch((error) => {
// //   console.error('Error connecting to MongoDB:', error);
// // });

// const dogsData = new mongoose.Schema({
//   name: String,
//   age: Number,
// });

// const dogsDataSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
// });

// const Dog = mongoose.model("Dog", dogsDataSchema);

// app.use(express.json());

// app.post("/addDogProfile", async (req, res) => {
//   const { name, age } = req.body;

//   try {
//     const newDog = new Dog({ name, age });
//     await newDog.save();
//     console.log("vad sker?")
//     res.status(201).send("Dog profile added successfully!");

//   } catch (error) {
//     console.error("Error adding dog profile:", error);
//     res.status(500).send("Failed to add dog profile.");
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

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
    console.log("Dog profile added successfully!");
    res.status(201).send("Dog profile added successfully!");
  } catch (error) {
    console.error("Error adding dog profile:", error);
    res.status(500).send("Failed to add dog profile.");
  }
});

app.get("/dogs", async (req, res) => {
  try {
    const dogs = await Dog.find();
    console.log(dogs);
    res.status(200).json(dogs);
    console.log(dogs);
  } catch (error) {
    console.error("fetching went to shit");
  }
});

start();
