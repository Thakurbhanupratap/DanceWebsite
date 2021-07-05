const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DanceData', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

//Express specific stuffs
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//Pug specific stuffs
app.set('view engine','pug');
app.set('views',path.join(__dirname , 'views'));


//Create schema
const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('Contact', contactSchema);

//Endpoint
app.get('',(req,res)=>{
    const params = {};
    res.status(200).render('home.pug',params);
});

app.get('/contact',(req,res)=>{
    const params = {};
    res.status(200).render('contact.pug',params);
});

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to database")
    })
});


//Start the server
// app.listen(port , ()=>{
//     console.log(`The application started successfully on port: ${port}`);
// })
app.listen(port , ()=>{
    console.log(`The application started successfully on port: ${port}`);
});

