const animals = [
    {
      "id": 1,
      "animalName": "Gerenuk Baby",
      "cuteness": 8,
      "imageURL" : "https://assets1.cbsnewsstatic.com/hub/i/2013/03/22/1465d956-a738-11e2-a3f0-029118418759/baby-gerenuk.jpg"
    },
    {
      "id": 2,
      "animalName": "Caiman Baby",
      "cuteness": 10,
      "imageURL" : "https://undergroundreptiles.com/wp-content/uploads/2021/12/ug_hatchling_baby_dwarf_caiman_1.jpg"
    }
];
let globalId = 3;

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    }, 
    getAnimals: (req, res) => res.status(200).send(animals),
    removeAnimal: (req, res) => {
        let { id } = req.params;
        let index = animals.findIndex(elem => elem.id === +id)
        animals.splice(index, 1)
        res.status(200).send(animals)
    },
    createAnimal: (req, res) => {
        let { animalName, cuteness, imageURL } = req.body
        let newAnimal = {
            id: globalId,
            animalName, 
            cuteness,
            imageURL
        }
        animals.push(newAnimal)
        res.status(200).send(animals)
        globalId++
    },
    updateAnimal: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = animals.findIndex(elem => +elem.id === +id)

        if (animals[index].cuteness <= 1 && type === 'minus') {
            animals[index].cuteness = 0
            res.status(200).send(animals)
        } else if (type === 'plus') {
            animals[index].cuteness += 1
            res.status(200).send(animals)
        } else if (type === 'minus') {
            animals[index].cuteness -= 1
            res.status(200).send(animals)
        } else {
            res.sendStatus(400)
        }
    }
}