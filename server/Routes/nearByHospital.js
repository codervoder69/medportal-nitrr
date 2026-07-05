const express=require('express');
const router=express.Router();

const {add,edit,deleteHos,getAll}=require('../Controllers/nearByHospital')
const {staffAdminAuth}=require('../Middlewares/auth');

router.post('/add',staffAdminAuth,add);
router.put('/update/:id',staffAdminAuth,edit);
router.delete('/delete/:id',staffAdminAuth,deleteHos);
router.get('/get-all',getAll);


module.exports=router;