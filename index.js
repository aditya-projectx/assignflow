const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const ejs = require('ejs')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
require('dotenv').config(); // Load environment variables



const db = require('./config/db')
const adminRoutes = require('./routes/routes.admin')
const studentRouters = require('./routes/routes.student')
const professorRoutes = require('./routes/routes.proffessor')
const hodRoutes = require('./routes/routes.hod')


const users = require('./models/model.user')

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static('uploads')); // For uploaded files
app.use(express.static('views'));   // For CSS files like style.css

app.use('/admin',autho,allowAdmin,adminRoutes)
app.use('/student',autho,allowStudent,studentRouters)
app.use('/proffessor',autho,allowProffesor,professorRoutes)
app.use('/hod',autho,allowHod,hodRoutes)

function autho(req,res,next){
    let token = req.cookies.user
    if(!token){
        res.send("token not generated")
    }
    jwt.verify(token,"mysecret",(err,decode)=>{
        if(err){
            return res.send(`<script>alert('error while matching the token  Redirecting back to login......'); window.location.href='/login'</script>`)
        }
        req.user = decode
        next()
    })
}
function allowAdmin(req,res,next){
    if(req.user.role !== 'admin')
        return res.status(403).send("Access denied");
    next()
}
function allowStudent(req,res,next){
    if(req.user.role !== 'student')
        return res.status(403).send("Access denied");
    next()
}
function allowProffesor(req,res,next){
    if(req.user.role != 'professor')
        return res.status(403).send("Access denied");
    next()
}
function allowHod(req,res,next){
    if(req.user.role != 'hod')
        return res.status(403).send("Access denied");
    next()
}

app.get('/',(req,res)=>
{
    res.redirect('/login')
})
app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',async(req,res)=>{
    const {email,password} = req.body
        let user = await users.findOne({email:email})
        if (!user) {
        return res.status(400).send("User not found");
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
           return res.send(`<script> alert("Password incorrect");window.location.href='/login'</script>`)
        }
        let token = jwt.sign(
                {_id:user._id,email:email,role:user.role},
                "mysecret",
                {expiresIn:'1d'}
            )
            res.cookie('user',token)
        if(user.role == 'admin'){
            return res.redirect('/admin/dash');
        }
        if(user.role == 'student')
        return res.redirect('/student/dash')
        if(user.role == 'professor')
        return res.redirect('/proffessor/dash')
        if(user.role == 'hod')
        return res.redirect('/hod/dash')
})



const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/login`)
})