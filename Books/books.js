const express = require('express')
const mongoose = require('mongoose');

//require('../db/db')
const Book = require('./Book')
const app = express()
const port = 3000

app.use(express.json())

mongoose.connect("mongodb+srv://niland:nanoNANO1109@todolist.lcqu6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",()=>{
    console.log("books Database connected")
})


app.post('/book', (req, res) => {
    const newBook = new Book({ ...req.body });
    newBook.save().then(() => {
        res.send('New Book added succussfully !!')
    }).catch((err) => {
        res.send(500).send("Internal Server Error !");
    })
    console.log(newBook)
})

app.get('/books', (req, res) => {
    Book.find().then((books) => {
        if (books.length !== 0) {
            res.json(books)
        } else {
            res.status(404).send('Book not found');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error !');
    });
})

app.get('/book/:id', (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if (book) {
            res.json(book)
        } else {
            res.status(404).send('Book not found');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error!')
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))