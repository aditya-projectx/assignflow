const mongoose = require('mongoose');
const { department } = require('../controllers/admin');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    },
    email:{
       type: String,
    required: true,
    unique:true 
    },
    password:{
        type: String,
    required: true,
    },
    phone:{
    type: String,
    required: true,
    minLength:6,
    maxLength:10
    },
    department:{
    type: String,
    required: true,
  
    },
    role:{
    type: String,
    required: true,
    }
});
const users = mongoose.model('Users', userSchema);
module.exports = users
