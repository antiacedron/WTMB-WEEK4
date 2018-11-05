module.exports = class Book{
    constructor (title) {
        this.title=title
        this.readers=[] 
        this.cities=[]
    } 

    located (city) {
        this.cities.push (city)
        city.books.push (this)   
    }
    static create (obj) {
        return new Book(obj.title); 
    } 
} 