const mongoose = require('mongoose')
require('dotenv').config();
let db = mongoose.connect(process.env.MONGO_URI)
.then((val)=>{
    console.log("db Connected")
})
.catch((err)=>{
    console.log("db not Connected= "+ err)
})
module.exports=db