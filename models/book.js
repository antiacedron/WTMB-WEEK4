module.exports = class Book{
    constructor (title,id) {
        this.title=title
        this.id=id
        this.readers=[] 
        this.cities=[]
    } 

    located (city) {
        this.cities.push (city)
        city.books.push (this)   
    }
    static create (obj) {
        return new Book(obj.title,obj.id); 
    } 
} 