const Person= require ("./models/person") 
const Book= require ("./models/book") 
const City= require ("./models/city") 
const Database= require ("./database") 
const Personservice= require ("./services/person-service") 

const main = async () => { 
  
  //list of readers
  
  const reader1 = new Person ("Emma Frost",37)
  const reader2 = new Person ("Erik Lensherr", 40)
  const reader3 = new Person ("Ororo Munroe", 23) 
  const reader4 = new Person ("Shiro Yoshida", 46) 
  
  
  //list of books 
  
  const howl= new Book ("Howl") 
  const  pi= new Book ("Pi")
  const  unmundofeliz= new Book ("Un mundo feliz") 
  const  lessthanzero= new Book ("Less than zero") 
  
  
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

 await Database.save(thecities) 
 const loadedCities = await Database.load('data.json'); 
 const convertedCities = loadedCities.map(City.create); 
 
 await Database.save(thebooks) 
 const loadedBooks =await Database.load('data.json'); 
 const convertedBooks = loadedBooks.map(Book.create); 

 await Database.save(thereaders) 
 const loadedReaders = await Database.load('data.json'); 
 const convertedReaders = loadedReaders.map(Person.create); 


 convertedCities[1].sayName();  
 console.log(Personservice);  
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
 

 


 