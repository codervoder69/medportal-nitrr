const express=require('express');
const router=express.Router();

const {staffAdminAuth}=require('../Middlewares/auth');
const {add,getAll,deleteNoti}=require('../Controllers/notification')

router.post('/add',staffAdminAuth,add);
router.delete('/delete/:id',staffAdminAuth,deleteNoti);
router.get('/get-all',getAll);

module.exports=router;