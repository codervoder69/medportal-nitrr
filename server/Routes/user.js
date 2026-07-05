const express=require('express');
const router=express.Router();


const {
    register,login,sendOTP,verifyOTP,resetPass,
    updateStudentById,getStudentByRollNo,registerStudentByStaff,
    addStaffByAdmin,getAllStaff,updateStaff,deleteStaff,
    logout
}=require('../Controllers/user')
const {studentAuth,staffAdminAuth}=require('../Middlewares/auth');

router.post('/register',register);
router.post('/login',login);
router.post('/send-otp',sendOTP);
router.post('/verify-otp',verifyOTP);
router.post('/reset-password',resetPass);
router.post('/logout',studentAuth,logout);


router.put('/update-student/:id',staffAdminAuth,updateStudentById);
router.get('/get-student/:roll',staffAdminAuth,getStudentByRollNo);
router.post('/register-student-by-staff',staffAdminAuth,registerStudentByStaff)
router.post('/add-staff',staffAdminAuth,addStaffByAdmin);
router.get('/get-all-staff',getAllStaff);
router.put('/update-staff/:id',staffAdminAuth,updateStaff);
router.delete('/delete-staff/:id',staffAdminAuth,deleteStaff);

module.exports=router;