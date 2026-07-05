const express=require('express');
const router=express.Router();

const {staffAdminAuth}=require('../Middlewares/auth');
const {add,getAll,update,getByName,deleteMed}=require('../Controllers/medicine');

router.post('/add',staffAdminAuth,add);
router.get('/get',getAll);
router.put('/update/:id',staffAdminAuth,update);
router.get('/get-by-name',getByName);
router.delete('/delete/:id',staffAdminAuth,deleteMed);

module.exports=router;