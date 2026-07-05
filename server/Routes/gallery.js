const express=require('express');
const router=express.Router();

const {staffAdminAuth}=require('../Middlewares/auth');
const {add,getAll,deteletImg}=require('../Controllers/gallery');

router.post('/add',staffAdminAuth,add);
router.get('/get-all',getAll);
router.delete('/delete/:id',staffAdminAuth,deteletImg);

module.exports=router;