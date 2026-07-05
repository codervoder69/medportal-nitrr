const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("Facility",facilitySchema);