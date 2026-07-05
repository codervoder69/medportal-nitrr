const express=require('express');
const router=express.Router();

const {studentAuth,staffAdminAuth}=require('../Middlewares/auth');
const {addHistory,getByMonth,getByRoll}=require('../Controllers/history');

router.post('/add',staffAdminAuth,addHistory);
router.get('/get-by-month',staffAdminAuth,getByMonth);
router.get('/get-by-roll',studentAuth,getByRoll)

module.exports=router;