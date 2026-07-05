const express=require('express');
const router=express.Router();

const {staffAdminAuth}=require('../Middlewares/auth');
const {add,update,getAll,deleteFac}=require('../Controllers/facilities');

router.post('/add',staffAdminAuth,add);
router.put('/update/:id',staffAdminAuth,update);
router.get('/get-all-fac',getAll);
router.delete('/delete/:id',staffAdminAuth,deleteFac);

module.exports=router;