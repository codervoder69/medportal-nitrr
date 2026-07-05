const jwt = require("jsonwebtoken");
const User = require("../Models/User");
require("dotenv").config();

// Auth
exports.studentAuth = async (req, res, next) => {
    try{
        // Extract min token
        let token = req.cookies.token;

        // If token missing return response
        if(! token){
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        // Verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("Decoded token :- ", decode);
            req.user = await User.findById(decode.userId).select('-password');

        }catch(error){
            return res.status(401).json({
                success: false,
                message: "Issue in verifying token",
            });
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
}


exports.staffAdminAuth = async (req, res, next) => {
    try{
        // Extract min token
        let token = req.cookies.token || res.body.token;

        // If token missing return response
        if(! token){
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        // Verify the token
        try{
            const decode =jwt.verify(token, process.env.JWT_SECRET);
            // console.log("Decoded token :- ", decode);
            req.user = await User.findById(decode.userId).select('-password');

            if(req?.user?.role==="Student"){
               return res.status(403).json({
                    success: false,
                    message: "Access denied: Students are not allowed on this route"
                });
            }

        }catch(error){
            return res.status(401).json({
                success: false,
                message: "Issue in verifying token",
            });
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
}