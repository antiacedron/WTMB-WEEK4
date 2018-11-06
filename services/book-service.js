const fs = require("fs") 
const CircularJSON = require ("circular-json") 
const BookModel = require('../models/book') 

const dbPath = `${__dirname}/../book-database.json`; 

function findAll() {
    return new Promise((resolve, reject) => {
        fs.readFile(dbPath, 'utf8', (err, file) => {
            if (err) return reject(err)

            const books = CircularJSON.parse(file).map(BookModel.create)

            resolve(books) 
        })
    })
}

async function add(book) {
    const allBooks = await findAll()
    const lastBook = allBooks[allBooks.length - 1]
    const lastBookId = lastBook && lastBook.id || 0
    book.id = lastBookId + 1 

    book = BookModel.create(book)
    allBooks.push(book) 

    await saveAll(allBooks)

    return book
} 

async function del(bookId) {
    const allBooks = await findAll()
    const bookIndex = allBooks.findIndex(p => p.id == bookId)
    if (bookIndex < 0) return 

    allBooks.splice(bookIndex, 1)

    saveAll(allBooks) 
}

async function find(bookId) {
    const allBooks = await findAll()

    return allBooks.find(p => p.id == personId) 
}

async function saveAll(books) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dbPath, CircularJSON.stringify(books), (err, file) => {
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