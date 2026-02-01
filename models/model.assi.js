const { ServerDescription } = require('mongodb')
const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title:{
        type: String,
        required: true,
        trim:true,
        maxlength: 150
    },
    description:{
        type: String,
        trim: true,
        maxlength:1000
    },
    category:{
        type: String,
        enum:['Assignment','Thesis','Report'],
        required: true
    },
    file: {
      originalName: { type: String, required: true },
      storedName: { type: String, required: true },
      path: { type: String, required: true },
      size: { type: Number, required: true },
      mimeType: {
        type: String,
        enum: ['application/pdf'],
        required: true
      }
    },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'reviewed'],
      default: 'draft'
    }
},{timestamps:true})
module.exports = mongoose.model('assignment',assignmentSchema)