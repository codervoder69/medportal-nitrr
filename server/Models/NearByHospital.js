const mongoose = require("mongoose");

const nearBySchema = new mongoose.Schema({
    name:{
        type:String,
    },
    address:{
        type:String,
    },
    contact:{
        type:String,
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

}, { timestamps: true });

module.exports = mongoose.model("NearByHospital", nearBySchema);