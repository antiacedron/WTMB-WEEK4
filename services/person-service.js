const fs = require("fs") 
const CircularJSON = require ("circular-json") 
const PersonModel = require('../models/person') 

const dbPath = `${__dirname}/../person-database.json`;  


//I tried to create the json file using fs.writeFileSync but it did not work 
// module.exports = {
//     save(readers) {
//         fs.writeFileSync("person-service.json","I created the json file"); 
//     }, 
//     load() {
//         return CircularJSON.parse(fs.readFileSync("person-service.json"))
//     }
// }  

function findAll() {
    return new Promise((resolve, reject) => {
        fs.readFile(dbPath, 'utf8', (err, file) => {
            if (err) return reject(err)

            const people = CircularJSON.parse(file).map(PersonModel.create)

            resolve(people) 
        })
    })
}

async function add(person) {
    const allPeople = await findAll()
    const lastPerson = allPeople[allPeople.length - 1]
    const lastPersonsId = lastPerson && lastPerson.id || 0
    person.id = lastPersonsId + 1

    person = PersonModel.create(person)
    allPeople.push(person)

    await saveAll(allPeople)

    return person
}

async function del(personId) {
    const allPeople = await findAll()
    const personIndex = allPeople.findIndex(p => p.id == personId)
    if (personIndex < 0) return

    allPeople.splice(personIndex, 1)

    saveAll(allPeople)
}

async function find(personId) {
    const allPeople = await findAll()

    return allPeople.find(p => p.id == personId)
}

async function saveAll(people) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dbPath, CircularJSON.stringify(people), (err, file) => {
            if (err) return reject(err) 

            resolve()
        })
    })
}

module.exports = {
    findAll,
    find,
    add,
    del,
    saveAll
}; 


