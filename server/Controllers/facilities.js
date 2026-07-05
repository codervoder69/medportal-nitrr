const Facility=require('../Models/Facilities');

exports.add=async(req,res)=>{
    try {

        const body={...req.body};
        const newFac=await Facility.create({
            ...body,
            addedBy:req.user._id
        })

        const allStuff=await Facility.findById(newFac._id).populate("addedBy");

        return res.status(200).json({
            status:true,
            message:"Added successfully",
            data:allStuff
        })
        
    } catch (error) {
        return res.status(400).json({
            status:false,
            message:"error occured"
        })
    }
}
exports.update=async(req,res)=>{
    try {

        const body={...req.body};
        const {id}=req.params;
        const newFac=await Facility.findByIdAndUpdate(
            id,
            {
                ...body,
                addedBy:req.user._id
            },
            {new:true}
        ).populate("addedBy");

        return res.status(200).json({
            status:true,
            message:"updated successfully",
            newFac
        })
        
    } catch (error) {
        return res.status(400).json({
            status:false,
            message:"error occured"
        })
    }
}
exports.getAll=async(req,res)=>{
    try {

        const allFac=await Facility.find().populate("addedBy","name").sort({createdAt:-1});

        return res.status(200).json({
            status:true,
            message:"fetched successfully",
            allFac
        })
        
    } catch (error) {
        return res.status(400).json({
            status:false,
            message:"error occured"
        })
    }
}

exports.deleteFac=async(req,res)=>{
    try {

        const {id}=req.params;

        await Facility.findByIdAndDelete(id);
        return res.status(200).json({
            status:true,
            message:"deleted successfully"
        })
        
    } catch (error) {
        return res.status(400).json({
            status:false,
            message:"error occured"
        })
    }
}