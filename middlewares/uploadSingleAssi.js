const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,  Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
    }
})
const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'application/pdf'){
        return cb(null, true)
    }
    cb(new Error('only PDF file are allowed'),false)
}

const uploads = multer({
    storage,
    fileFilter,
    limits:{ fileSize: 1024*1024*10 }
})
module.exports = uploads