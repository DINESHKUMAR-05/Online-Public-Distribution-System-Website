const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');

var bodyParser = require("body-parser")
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended:true
}))

app.set('view engine','ejs');

app.use( express.static( "publics" ) );

mongoose.connect('mongodb://localhost:27017/Logindb');

const usersSchema  = {
    CardNumber: String,
    FamilyHead: String,
    Count: String,
    Address: String,
    Shopno: String,
    PhNumber: String,
    MailID: String,
    Password: String
}

const user = mongoose.model('user',usersSchema);



app.get('/',(req,res) => {
    user.find({},function(err,users){
        res.render('carddetails',{
            usersList : users
        })
    })
})

app.listen(4000,function(){
    console.log('server is running');
})

