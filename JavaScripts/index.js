var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Logindb')
var db = mongoose.connection;
db.on('error',()=>console.log('Error in Connecting to Database'));
db.once('open',()=>console.log("connected to db"));


app.post("/sign_up",(req,res)=>{
    var cardnumber = req.body.cardnumber;
    var familyhead = req.body.familyhead;
    var count = req.body.count;
    var address = req.body.address;
    var shop = req.body.shop;
    var phnumber = req.body.phnumber;
    var mailid = req.body.mailid
    var password = req.body.pwd;

    var data={
        "CardNumber" : cardnumber,
        "FamilyHead" : familyhead,
        "Count" : count,
        "Address" : address,
        "Shopno" : shop,
        "PhNumber" : phnumber,
        "MailID" : mailid,
        "Password" : password

    }
     db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
     });
     return res.redirect('index.html')
})

app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
        });
    return res.redirect('index.html');
    }).listen(3000)

console.log("Listening on PORT 3000");

var db = mongoose.connection;
db.on('error',()=>console.log('Error in Connecting to Database'));
db.once('open',()=>console.log("connected to db"));
app.post("/log_in",(req,res)=>{
    var cardnumber = req.body.logincardnumber;
    var password = req.body.loginpsw;
    console.log(cardnumber);
    db.collection("users").find({}).toArray(function(err, result) {
    if (err) throw err;
    var count = 0;
        for (let i =0; i<result.length; i++){
            console.log(result[i])
            
            if (cardnumber == result[i].CardNumber && password == result[i].Password){
                console.log('Login Successful')
                return res.redirect('Homepage.html')
            }
            else{
                
                console.log("Invalid");
                count+=1;
            }
            if(count==result.length){
             res.redirect('/');   
            }
        }

});
})

mongoose.connect('mongodb://localhost:27017/Logindb')
var db = mongoose.connection;
db.on('error',()=>console.log('Error in Connecting to Database'));
db.once('open',()=>console.log("connected to db"));

app.post("/order_details",(req,res)=>{
    var cardnumber = req.body.cardno;
    var shop = req.body.shopno;    
    var ShoppingDate = req.body.shopdate;
    var ShoppingTime = req.body.taketime;
    var Rice = req.body.Rice;
    var Wheat = req.body.Wheat;
    var Sugar = req.body.Sugar;
    var Kerosene = req.body.Kerosene;
    var ToorDhal = req.body.ToorDhal;
    var UridDhal = req.body.UridDhal;
    var PalmOil = req.body.PalmOil;
    var Salt = req.body.Salt;
    var ordertotal = (Rice*5)+(Wheat*8)+(Sugar*14)+(Kerosene*15)+(ToorDhal*20)+(UridDhal*30)+(PalmOil*25)+(Salt*20);
    ordertotal+=((ordertotal*0.03)+1);


    var data={
        "CardNumber" : cardnumber,
        "Shop" : shop,
        "ShoppingDate" : ShoppingDate,
        "ShoppingTime" : ShoppingTime,
        "Rice" : Rice,
        "Wheat" : Wheat,
        "Sugar" : Sugar,
        "Kerosene" : Kerosene,
        "ToorDhal" : ToorDhal,
        "UridDhal" : UridDhal,
        "PalmOil" : PalmOil,
        "Salt" : Salt,
        "GrandTotal" : ordertotal
    }

     db.collection('orders').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
     });
     return res.redirect('suceessfullorder.html')
})


mongoose.connect('mongodb://localhost:27017/Logindb')
var db = mongoose.connection;
db.on('error',()=>console.log('Error in Connecting to Database'));
db.once('open',()=>console.log("connected to db"));

app.post("/feedback",(req,res)=>{
    var cardnumber = req.body.cardnumber;
    var feedback = req.body.feedback;    

    var data={
        "CardNumber" : cardnumber,
        "Feedback" : feedback
    }

     db.collection('feedback').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
     });
     return res.redirect('feedbacksuccess.html')
})
