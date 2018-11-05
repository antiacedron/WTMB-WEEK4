module.exports = class City{
    constructor (name) {
        this.name= name 
        this.readers=[] 
        this.books=[] 
    }
    sayName() {console.log(this.name);} 

    static create (obj) {
        return new City(obj.name); 
    } 
 } 