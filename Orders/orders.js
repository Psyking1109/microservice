const express = require('express')
const app = express()
const mongoose = require("mongoose")
const axios = require('axios')
const port = 9000
const Order = require('./Order')
const { response } = require('express')

app.use(express.json())

//require('../db/db')

mongoose.connect("mongodb+srv://niland:nanoNANO1109@todolist.lcqu6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",()=>{
    console.log("Order Database connected")
})


app.post('/order', (req, res) => {
    const newOrder = new Order({
        customerID: mongoose.Types.ObjectId(req.body.customerID),
        bookID: mongoose.Types.ObjectId(req.body.bookID),
        initialDate: req.body.initialDate,
        deleveryDate: req.body.deleveryDate
    });

    newOrder.save().then(() => {
        res.send('New order added successfully!')
    }).catch((err) => {
        res.status(500).send('Internal Server Error!')
    })
    console.log(newOrder)
})

app.get('/orders', (req, res) => {
    Order.find().then((orders) => {
        if (orders) {
            res.json(orders)
        } else {
            res.status(404).send('Orders not found')
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
})

app.get('/orders', (req, res) => {
    Order.find().then((orders) => {
        if (orders) {
            res.json(orders)
        } else {
            res.status(404).send('Orders not found');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
})

app.get('/order/:id', (req, res) => {
    Order.findById(req.params.id).then((order) => {
        if (order) {
            axios.get(`http://localhost:5000/customer/${order.customerID}`).then((response) => {
                let orderObject = {
                    CustomerName: response.data.name,
                    BookTitle: ''
                }
                axios.get(`http://localhost:3000/book/${order.bookID}`).then((response) => {
                    orderObject.BookTitle = response.data.title
                    res.json(orderObject);
                })
            })
        } else {
            res.status(404).send('Order not found');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error')
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))