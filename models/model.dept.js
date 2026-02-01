const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
    },
  type: {
    type: String,
    required: true,
    },
  address: {
    type: String,
    required: true,
    },
    noUser:{
      typr:Number,
    }
});
const department = mongoose.model('Department', departmentSchema);
module.exports = department
