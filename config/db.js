const mongoose = require('mongoose')

let db = mongoose.connect('mongodb://localhost:27017/uniPro')
.then((val)=>{
    console.log("db Connected")
})
.catch((err)=>{
    console.log("db not Connected= "+ err)
})
module.exports=db