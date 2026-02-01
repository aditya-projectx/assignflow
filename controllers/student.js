const assignments = require('../models/model.assi')

exports.stuDash = async(req,res)=>{
    res.render('student-dashboard',{
        stats: {
            draft: 3,
            submitted: 6,
            approved: 4,
            rejected: 1
        },
        assignments: [
            { title: 'Assignment 5 - DBMS Project', status: 'Submitted' },
            { title: 'Assignment 4 - OS Case Study', status: 'Approved' },
            { title: 'Assignment 3 - Web Demo', status: 'Rejected' },
            { title: 'Assignment 2 - Algo Worksheet', status: 'Draft' },
            { title: 'Assignment 1 - Linux Lab', status: 'Approved' }
        ]
    })
}
exports.assiForm = (req,res)=>{
    res.render('upload-single')
}
exports.sUpload = async(req,res)=>{
    try {
        const { title, description, category } = req.body
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const assignment = await assignments.create({
            studentId: req.user._id,
            title,
            description,
            category,
            file:{
                originalName: req.file.originalname,
                storedName: req.file.filename,
                path: req.file.path,
                size: req.file.size,
                mimeType: req.file.mimetype
            }
        })
        res.send(`<script>confirm("Assignment uploaded successfully"); window.location.href='/student/dash'</script>`)
    } catch (error) {
        res.send(error);
    }
}
exports.logout = (req,res)=>{
    res.clearCookie('token')
    res.send(`<script>confirm("Logged out successfully"); window.location.href='/login'</script>`)
}