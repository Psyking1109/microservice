const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://niland:nanoNANO1109@todolist.lcqu6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { 
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false,
     useCreateIndex: true
}).then(() => {
     console.log('Connection successful!');
}).catch((e) => {
     console.log('Connection failed!');
})