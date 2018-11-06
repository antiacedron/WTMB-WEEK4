const express = require('express')
const bodyParser = require('body-parser') 

const app = express() 

const Person= require ("./models/person") 
const Book= require ("./models/book") 
const City= require ("./models/city") 
//const Database= require ("./database") 
const Personservice= require ("./services/person-service") 
const Bookservice= require ("./services/book-service") 
const Cityservice= require ("./services/city-service") 

app.set('view engine', 'pug') 
app.use(bodyParser.json()) 

app.get('/', async(req, res, next) => {
    res.render("index") 
    //res.sendFile(__dirname + "/index.html") 
    //res.send(await Personservice.findAll()) 
  }) 
  
  app.get('/person/all', async (req, res, next) => {
    const people = await Personservice.findAll()
    res.render('person', { people: people }) 
  }) 
  
  // app.get('/person/:id', async (req, res) => {
  //   const user = await Personservice.find(req.person.id)
  //   res.send(user)  
  // })
  
  app.post('/person', async (req, res, next) => {
    const person = await Personservice.add(req.body) 
    res.send(person) 
  }) 

  app.delete('/person/:personId', async (req, res) => {
    await Personservice.del(req.params.personId)
    res.send("ok") 
  })
  //app.get("/",(req,res,next)=>{res.send("Hello people")}); 
  app.listen(5000, () => {
    console.log('Server listening')
  }) 



  //Data 



const main = async () => { 
  
  //list of readers
  
  const reader1 = new Person ("Emma Frost",37, 1)
  const reader2 = new Person ("Erik Lensherr", 40, 2)
  const reader3 = new Person ("Ororo Munroe", 23, 3) 
  const reader4 = new Person ("Shiro Yoshida", 46, 4) 
  
  
  //list of books 
  
  const howl= new Book ("Howl",1) 
  const  pi= new Book ("Pi",2)
  const  unmundofeliz= new Book ("Un mundo feliz",3) 
  const  lessthanzero= new Book ("Less than zero",4) 
  
  
  //list of cities 
  
  const berlin= new City ("Berlin") 
  const madrid= new City ("Madrid")
  const venice= new City ("Venice") 
  
  //interactions  
  
  reader1.read(howl) 
  reader2.read(howl)
  reader3.read(howl)
  reader1.read(pi)
  reader1.read(unmundofeliz) 
  
  
  reader1.live(berlin) 
  reader2.live(berlin) 
  reader3.live (madrid)
  reader4.live(venice) 
  
  howl.located(berlin)
  howl.located(madrid)
  lessthanzero.located(berlin)  

  //console.log (madrid); 
  //console.log (reader1); 

  //berlin.sayName() 

 const thecities = [berlin,madrid,venice]; 
 const thebooks = [howl,pi,lessthanzero,unmundofeliz]; 
 const thereaders = [reader1,reader2,reader3,reader4]; 

 await Cityservice.saveAll(thecities) 
 const loadedCities = await Cityservice.findAll('city-database.json');
 const convertedCities = loadedCities.map(City.create); 
 
 await Bookservice.saveAll(thebooks) 
 const loadedBooks =await Bookservice.findAll('book-database.json'); 
 const convertedBooks = loadedBooks.map(Book.create); 

 await Personservice.saveAll(thereaders) 
 const loadedReaders = await Personservice.findAll("person-Database.json");  
 const convertedReaders = loadedReaders.map(Person.create); 


 //convertedCities[1].sayName();   
} 

(async () => {
  try {
      await main()
  } catch (e) {
      console.log(e)
  }
})() 

//checking  that they are objects again, are functions working ?  

// convertedBooks[1].located(venice); 
// convertedReaders[2].read(loadedBooks[1]); 
 

 


 