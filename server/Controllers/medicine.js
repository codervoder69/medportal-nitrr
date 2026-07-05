const Medicine=require('../Models/Medicine');

exports.add=async(req,res)=>{
    try {

        const {name,quantity,usage}=req.body;
        
        const newMed=await Medicine.create(
            {
                name,
                quantity:Number(quantity),
                usage,
                addedBy:req.user._id
            }
        );
        const populatedMed = await Medicine.findById(newMed._id).populate("addedBy","name");

        return res.status(200).json({
            success:true,
            message:"Medicine added successfully",
            newMed:populatedMed
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error Medicine error"
        })
    }
}
exports.getAll=async(req,res)=>{
    try {
        
        const allMed=await Medicine.find().populate("addedBy","name").sort({createdAt:-1});

        return res.status(200).json({
            success:true,
            message:"Medicine fetched successfully",
            allMed
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error Medicine error"
        })
    }
}
exports.update=async(req,res)=>{
    try {
        const body={...req.body};
        const {id}=req.params;
        const updatedMed=await Medicine.findByIdAndUpdate(
            id,
            {
                ...body,
                addedBy:req.user._id
            },
            {new:true}
        ).populate("addedBy");

        return res.status(200).json({
            success:true,
            message:"Medicine updated successfully",
            updatedMed
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error Medicine error"
        })
    }
}
exports.getByName=async(req,res)=>{
    try {
        const {name}=req.query;
        // const {id}=req.params;
        const getMed=await Medicine.find({
            name:{
                $regex:'^'+name,
                $options:'i'
            }
        }).populate("addedBy","name").sort({createdAt:-1})

        return res.status(200).json({
            success:true,
            message:"Medicine fetched by name successfully",
            med:getMed
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error Medicine error"
        })
    }
}

exports.deleteMed=async(req,res)=>{
    try {

        const {id}=req.params;

        await Medicine.findByIdAndDelete(id);
        return res.status(200).json({
            success:true,
            message:"medicine deleted successfully "
        })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in deleting medicine"
        })
    }
}