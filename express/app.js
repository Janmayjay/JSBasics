const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('view engine','ejs');
// app.get("/",(request,response)=>{

// });

const dbConfig = {
    "url":"mongodb://localhost:27017/shop"
};
const connection = mongoose.connect(dbConfig.url,{poolSize:20});
var Schema = mongoose.Schema;
var userSchema = new Schema({
    "userid":String,"pwd":String
});
var User = mongoose.model("users",userSchema);


app.post("/login",(request,response)=>{
    console.log(request.query);
    var usrName=request.body.userName;
    var pwd=request.body.password;
    if(usrName==pwd)
    {
function addUser(userObject,response){
            User.create(userObject,(error)=>{
                if(error){
                    response.send("Something Wrong in DB",error);    
                }
                else{
                    response.send("U Register SuccessFully....");    
                }
            });
        }
    }
    //response.render('welcome');
    console.log(usrName,pwd);
});


app.listen(4567,()=>{
    console.log("Server started");
})