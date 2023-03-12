const complimentBtn = document.getElementById("complimentButton")
const animalsContainer = document.querySelector('#animals-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/animals`;

const animalsCallback = ({ data: animals }) => displayAnimals(animals)
const errCallback = err => console.log(err)

const getAllAnimals = () => axios.get(baseURL).then(animalsCallback).catch(errCallback)
const createAnimal = body => axios.post(baseURL, body).then(animalsCallback).catch(errCallback)
const removeAnimal = id => axios.delete(`${baseURL}/${id}`).then(animalsCallback).catch(errCallback)
const updateAnimal = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(animalsCallback).catch(errCallback)

getAllAnimals();

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

function submitHandler(e) {
    e.preventDefault()

    let animalName = document.querySelector('#animal-name')
    let cuteness = document.querySelector('#cuteness')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        animalName: animalName.value,
        cuteness: cuteness.value, 
        imageURL: imageURL.value
    }

    createAnimal(bodyObj)

    animalName.value = ''
    cuteness.value = ''
    imageURL.value = ''
};

function createAnimalCard(animal) {
    const animalCard = document.createElement('div')
    animalCard.classList.add('animal-card')

    animalCard.innerHTML = `<img alt='animal-image' src=${animal.imageURL} class="animal-image"/>
    <p class="animal-name">${animal.animalName}</p>
    <div class="btns-container">
        <button onclick="updateAnimal(${animal.id}, 'minus')">-</button>
        <p class="animal-cuteness">${animal.cuteness}</p>
        <button onclick="updateAnimal(${animal.id}, 'plus')">+</button>
    </div>
    <button onclick="removeAnimal(${animal.id})">Remove</button>
    `


    animalsContainer.appendChild(animalCard)
}

function displayAnimals(arr) {
    animalsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createAnimalCard(arr[i])
    }
}


complimentBtn.addEventListener('click', getCompliment)
form.addEventListener('submit', submitHandler)

getAllAnimals()