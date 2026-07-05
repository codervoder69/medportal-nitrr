const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async() => {

    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database Connection Successfull");
    } catch (error) {
        console.log("Error in db connection :- ", error);
    }
}