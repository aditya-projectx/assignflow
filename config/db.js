const mongoose = require('mongoose')

let db = mongoose.connect('mongodb+srv://aditya:aditya@cluster0.cjrinwk.mongodb.net/')
.then((val)=>{
    console.log("db Connected")
})
.catch((err)=>{
    console.log("db not Connected= "+ err)
})
module.exports=db