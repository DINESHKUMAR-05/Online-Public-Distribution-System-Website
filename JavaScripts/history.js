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
    Shop: String,
    ShoppingDate: String,
    ShoppingTime: String,
    Rice: String,
    Wheat: String,
    Sugar: String,
    Kerosene: String,
    ToorDhal: String,
    UridDhal: String,
    PalmOil: String,
    Salt: String,
    GrandTotal: String
}

const order = mongoose.model('order',usersSchema);



app.get('/',(req,res) => {
    order.find({},function(err,orders){
        res.render('History',{
            OrdersList : orders
        })
    })
})

app.listen(5000,function(){
    console.log('server is running');
})