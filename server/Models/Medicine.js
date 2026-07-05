const mongoose = require("mongoose");


const MedicineSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    quantity:{
        type:Number,
    },
    usage:{
        type:String,
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("Medicine",MedicineSchema);