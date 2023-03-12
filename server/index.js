const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const {
    getCompliment,
    getAnimals,
    removeAnimal, 
    createAnimal, 
    updateAnimal
} = require('./controller')

app.get("/api/compliment", getCompliment);
app.get(`/api/animals`, getAnimals)
app.delete(`/api/animals/:id`, removeAnimal)
app.post(`/api/animals`, createAnimal)
app.put(`/api/animals/:id`, updateAnimal)

app.listen(4000, () => console.log("Server running on 4000"));
