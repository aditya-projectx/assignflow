const department = require('../models/model.dept')
const users = require('../models/model.user')
const bcrypt = require('bcrypt')

exports.dashboard=async(req,res)=>{
    try {

        const td = await department.countDocuments();
        const ts = await users.find({role:'student'});
        const tp = await users.find({role:'professor'});
        const th = await users.find({role:'hod'});
        res.render('dash',{
            totalDepartments: td,
            totalStudents: ts.length,
            totalProfessors: tp.length,
            totalHods: th.length
        })
    } catch (error) {
        console.log(error)
    }
}

exports.department= async (req, res) => {
    
  const departments = await department.find({})

  res.render('deptList', { departments, msg: req.query.msg});
}

exports.deptcreate = (req,res)=>{
    res.render('depform')
}

exports.adddept = async(req,res)=>{
    const{name,type,address} = req.body
    try {
        await department.create({name:name,type:type,address:address})
        res.send(`<script>alert("department created"); window.location.href= ('/admin/departments');</script>`)
    } catch (error) {
        res.send("error inside putting data into deparment collection")
    }
    
}

exports.delD = async(req,res)=>{
    try {
        let id = req.params.id
        let checkUser = await department.findById({_id:id})
        if(checkUser.noUser == 1){
            return res.redirect(`/admin/departments?msg=Department cannot be deleted because it contain 1 user`);
        }
        else if(checkUser.noUser > 0){
            return res.redirect(`/admin/departments?msg=Department cannot be deleted because it contain ${checkUser.noUser} users`);
        }

        let mss = await department.findByIdAndDelete({_id:id})
        return res.redirect(`/admin/departments?msg=Department deleted successfully.`);
    } catch (error) {
        res.send("cant delete the thing: "+error)
    }
}

exports.editD = async(req,res)=>{
    try {
        let id = req.params.id
        let data = await department.findById({_id:id})
        res.render('edit-dept',{data})
    } catch (error) {
        res.send("edit not working: "+error)
    }
}

exports.updateD = async(req,res)=>{
    try {
        let id = req.params.id
        let {name,type,address} = req.body;
        await department.findByIdAndUpdate({_id:id},{$set:{name:name,type:type,address:address}})
        res.send(`<script> alert("seccessfully updated"); window.location.href="/admin/departments" </script>`)
    } catch (error) {
        res.send("error in updating the edit dept:" + error)
    }
}

exports.createU = async(req,res)=>{
    try {
        const pwd = Math.random().toString(36).slice(-8);
        let dept = await department.find({});
        res.render('create-user.ejs',{dept,pwd})
    } catch (error) {
        res.send("ERROR:/admin/users/create: "+ error)
    }
}

exports.addU = async(req,res)=>{
    try {
        let { name, email, password, phn, dept, role} = req.body 
        let hashed = await bcrypt.hash(password,10)
        await users.create({name:name,email:email,password:hashed,phone:phn,department: dept,role:role})
        await department.findOneAndUpdate({name:dept},{$inc: {noUser:1}})
        res.redirect("/admin/users")
    } catch (error) {
        res.send("ERROR:/admin/users/create: "+ error)
    }
}

exports.users = async(req,res)=>{
    try {
        const user = await users.find({})
        res.render('user-list',{user})
    } catch (error) {
       res.send(error) 
    }
    
}

exports.delU = async(req,res)=>{
    try {
        let id = req.params.id
        let Dname = req.params.department
        if(Dname == "adminDept")
           return res.send(`<script> alert("Nice Try :) ");window.location.href='/admin/users'</script>`);

        await users.findByIdAndDelete({_id:id})
        await department.findOneAndUpdate({name:Dname},{$inc:{noUser:-1}})
        res.redirect('/admin/users');
    } catch (error) {
        res.send(error)
    }
}

exports.editU = async(req,res)=>{
    let id = req.params.id
    let fdata = await users.findById({_id:id})
    let data = {
        name:fdata.name,
        email: fdata.email,
        phone: fdata.phone,
        department: fdata.department
    }
    let depts = await department.find({})
    res.render('edit-user',{data,depts})
}
exports.updateU = async(req,res)=>{
    let id = req.params.id
    const {name, email, phone, department:newDept, password} = req.body
    let user = await users.findById(id)
    if(user.department != newDept){
        await department.findOneAndUpdate({name:user.department},{$inc: {noUser:-1}})
        await department.findOneAndUpdate({name:newDept },{$inc: {noUser:1}})
    }
    let hash = await bcrypt.hash(password,10)
    await users.findOneAndUpdate({_id:id},{$set:{name:name,email:email,phone:phone, department:newDept,password:hash}})
    
    res.redirect('/admin/users')
}
