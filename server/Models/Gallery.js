const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
    link:{
        type:String,
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

}, { timestamps: true });

module.exports = mongoose.model("Gallery", gallerySchema);