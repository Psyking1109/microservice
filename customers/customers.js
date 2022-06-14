const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 5000
app.use(express.json())

//require('../db/db');
const Customer = require('./Customer');


mongoose.connect("mongodb+srv://niland:nanoNANO1109@todolist.lcqu6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",()=>{
    console.log("Customer Database connected")
})

app.post('/customer',(req,res)=>{
    const newCustomer = new Customer({...req.body});
    newCustomer.save().then(()=>{
        res.send('New Customer created successfully !');
        
    }).catch((err)=>{
        res.send(500).send('Internal Server Error!');
    })
    console.log(newCustomer)
})

app.get('/customer',(req,res)=>{
    Customer.find().then((customer)=>{
        if(customer){
            res.json(customer)
        }else{
            res.status(404).send('internal Server Error!');
        }
    })
})

app.get('/customer/:id',(req,res)=>{
    Customer.findById(req.params.id).then((customer)=>{
        if(customer){
            res.json(customer)
        }else{
            res.status(404).send('customer not Found');
        }
    }).catch((err)=>{
        res.status(500).send('Internal Server Error!');
    })
})

app.delete('/cutomer/:id',(req,res)=>{
    Customer.findByIdAndRemove(req.params.id).then((customer)=>{
        if(customer){
            res.json('customer deleted Successfully!')
        }else{
            res.status(404).send('Customer Not Found !');
        }
    }).catch((err)=>{
        res.status(500).send('Internal Server Error')
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))