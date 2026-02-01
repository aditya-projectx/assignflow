const express = require('express');
const router = express.Router();
const { 
    dashboard,
    department,
    deptcreate,
    adddept,
    delD,
    editD,
    updateD,
    createU,
    addU,
    users,
    delU,
    editU,
    updateU,
 } = require('../controllers/admin');

router.get('/dash', dashboard);
router.get('/departments',department);
router.get('/departments/create',deptcreate);
router.post('/departments/create',adddept);
router.get('/departments/:id/delete',delD);
router.get('/departments/:id/edit',editD);
router.post('/departments/:id/edit',updateD);
router.get('/users/create',createU);
router.post('/users/create',addU);
router.get('/users',users);
router.get('/users/:id/:department/delete',delU);
router.get('/users/:id/edit',editU)
router.post('/users/:id/edit',updateU)
module.exports = router;
