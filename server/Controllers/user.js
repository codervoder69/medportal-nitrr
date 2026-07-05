const User=require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpTemplate = require('../MailTemplates/otpTemp');
const mailSender = require('../Utils/mailSender');
const otpgenerator = require('otp-generator');
const credentialsTemplate = require('../MailTemplates/credentials');

require('dotenv').config();

// register controller
exports.register=async(req,res)=>{
    try {

        const { name, email, password, rollno } = req.body;
        
        // this email id is new or not
        const userExist=await User.findOne({email:email});
        if(userExist){
            return res.status(400).json({
                success:false,
                message:"User Exist with this mailId, please Login"
            })
        }
        // this roll no exist
        const userExist2=await User.findOne({roll:rollno});
        if(userExist2){
            return res.status(400).json({
                success:false,
                message:"User Exist with this rollno, please Login"
            })
        }

        const hashedPass=await bcrypt.hash(password,10);
        const newUser=await User.create({
            name:name,
            email:email,
            password:hashedPass,
            roll:rollno
        })


        return res.status(200).json({
            success:true,
            message:"SignUp successfull",
            // user:newUser
        })

        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"SignUp failed"
        })
    }


}



// login controller
exports.login=async(req,res)=>{
    try {

        const {email,password}=req.body;

        // this email id is new or not
        const userExist=await User.findOne({email:email});
        if(!userExist){
            return res.status(400).json({
                success:false,
                message:"User dont Exist, please Signup"
            })
        }

        //check password
        if(await bcrypt.compare(password,userExist.password)){

            const token=jwt.sign(
                {
                    //payload
                    userId:userExist._id
                },
                process.env.JWT_SECRET
            )

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                maxAge: 7*24*60*60*1000 
            })

            return res.status(200).json({
                success:true,
                message:"login successfull",
                user:userExist,
                token
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"login failed: wrong password"
            })
        }
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"login failed"
        })
    }
}


// send otp for forget password
exports.sendOTP = async (req, res) => {
    try{
        const {email} = req.body;

        // Check User already exists or not
        const userPresent = await User.findOne({email});
        if(!userPresent){
            return res.status(401).json({
                success: false,
                message: "User dont exists"
            });
        }

        // OTP generate : (must be unique)
        let otp = otpgenerator.generate(6);

        userPresent.resetPasswordToken=otp;
        userPresent.resetPasswordExpires=Date.now()+5*60*1000;

        await userPresent.save();
        
        const mailBody=otpTemplate(otp);

        await mailSender(email,"OTP",mailBody);

        // Return response successfull
        res.status(200).json({
            success: true,
            message: "OTP sent Successfully",
            // otp,
        })
    }catch(error){
        console.log("Error while sending OTP :- ", error);

        res.status(500).json({
            success: false,
            message: `OTP sending failed :- ${error.message}`,
        })
    }
};



// verify otp
exports.verifyOTP=async(req,res)=>{
    try {

        const {email,otp}=req.body;

        // user exist or not
        const currUser=await User.findOne({email:email});
        if(!currUser){
            return res.status(401).json({
                success: false,
                message: "User dont exists"
            });
        }

        if(otp!=currUser.resetPasswordToken){
            return res.status(401).json({
                success: false,
                message: "Wrong OTP"
            });
        }

        if(currUser.resetPasswordExpires<Date.now()){
            return res.status(401).json({
                success: false,
                message: "OTP has expired"
            });
        }

        res.status(200).json({
            success: true,
            message: `OTP matches successfully`,
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `OTP verification failed :- ${error.message}`,
        })
    }
}


// resetPassword
exports.resetPass=async(req,res)=>{
    try {

        const {email,newPass}=req.body;

        // user exist or not
        const currUser=await User.findOne({email:email});
        if(!currUser){
            return res.status(401).json({
                success: false,
                message: "User dont exists"
            });
        }

        const hashedPass=await bcrypt.hash(newPass,10);
        currUser.password=hashedPass
        currUser.resetPasswordExpires=undefined;
        currUser.resetPasswordToken=undefined;
        await currUser.save();

        res.status(200).json({
            success: true,
            message: "Password reset successful",
        });

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `error :- ${error.message}`,
        })
    }
}


// update student(by id) -by staff 
exports.updateStudentById=async(req,res)=>{
    try {

        const {id}=req.params;
        const {
                name,
                email,
                rollNo,
                mobile,
                fatherName,
                fatherMobile,
                address,
                healthIssue,
                age,
                bloodGroup
                    }=req.body;
        const updatedUser=await User.findByIdAndUpdate(
            id,
            {
                name,
                email,
                roll:rollNo,
                mobileNo:mobile,
                fatherName,
                fatherMobile,
                address,
                previous_health:healthIssue,
                age,
                bloodGroup
            },
            {new:true}
        );
        if(!updatedUser){
            res.status(500).json({
                success: false,
                message: `no such user exist`,
            })
        }
        res.status(200).json({
            success: true,
            message: `Student Updated successfully`,
            updatedUser
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `error :- ${error.message}`,
        })
    }
}

exports.getStudentByRollNo=async(req,res)=>{
    try {

        const {roll}=req.params;
        const currStudent=await User.findOne({roll:roll});
        if(!currStudent){
            return res.status(500).json({
                success: false,
                message: `no student with this roll number`,
            })
        }

        return res.status(200).json({
            success:true,
            message:"Student details fetched succefffully",
            data:currStudent
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `error :- ${error.message}`,
        })
    }
}

exports.registerStudentByStaff=async(req,res)=>{
    try {
        
        
        const {
                name,
                email,
                rollNo,
                mobile,
                fatherName,
                fatherMobile,
                address,
                healthIssue,
                age,
                bloodGroup
                    }=req.body;

        const doExist=await User.findOne({email:email});
        if(doExist){
            return res.status(500).json({
                success: false,
                message: `student exist already`,
            })
        }

        const otp=otpgenerator.generate(6).toString(); 
        const hashedPass=await bcrypt.hash(otp,10);

        const newUser=await User.create(
            {
                name,
                email,
                roll:rollNo,
                mobileNo:mobile,
                fatherName,
                fatherMobile,
                address,
                previous_health:healthIssue,
                age,
                bloodGroup,
                password:hashedPass
            }
        )

        const mailBody=credentialsTemplate(email,otp);
        try {
            await mailSender(email,"Credentials: SWASTHYA_NITRR",mailBody);
            
        } catch (error) {

                return res.status(502).json({
                success: false,
                message: `error :- mail sending`,
            })
        }
        

        return res.status(200).json({
            success:true,
            message:"Registered successfully",
            newUser
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `error :- ${error.message}`,
        })
    }
}

exports.addStaffByAdmin = async (req, res) => {
    try {
        const { name, email, password, designation, mobileNo } = req.body;

        // Validate inputs
        if (!name || !email || !password || !designation || !mobileNo) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Someone active with this email already exists.",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newStaff = await User.create({
            name,
            email,
            password: hashedPassword,
            designation,
            mobileNo,
            role: "Staff"
        });

        const mailBody = credentialsTemplate(email, password);
        try {
            await mailSender(email, "Staff Credentials: SWASTHYA_NITRR", mailBody);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Mail Error",
            });
        }

        res.status(200).json({
            success: true,
            message: "Staff entry created successfully in DB.",
            newStaff
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};


exports.getAllStaff=async(req,res)=>{
    try {

        const staffs=await User.find({role:"Staff"});
        res.status(200).json({
            success: true,
            message: `all staffs fetched successfully`,
            staffs
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `error :- ${error.message}`,
        })
    }
}

exports.updateStaff=async(req,res)=>{
    try {
        const {id}=req.params;
        const {name,designation,mobileNo}=req.body;

        const updatedStaff=await User.findByIdAndUpdate(
            id,
            {
                name:name,
                designation:designation,
                mobileNo:mobileNo
            },
            {new:true}
        )
        
        res.status(200).json({
            success: true,
            message: `staff details updated successfully`,
            data:updatedStaff
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `error :- ${error.message}`,
        })
    }
}

exports.deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (deletedUser) {
            return res.status(200).json({
                success:true,
                message: "Staff deleted"
            })
        }
        return res.status(500).json({
                error: "Something Went Wrong in deleting staff",
                message: err.message
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            message: err.message
        })
    }
}

exports.logout = (req, res) => {
   res.clearCookie("token", {
    httpOnly: true,
    secure: true,       
    sameSite: "None",     
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
