const NearByHospital=require('../Models/NearByHospital');


exports.add=async(req,res)=>{
    try {

        const body={...req.body};

        const newHos=await NearByHospital.create({
            ...body,
            addedBy:req.user._id
        })
        const final=await NearByHospital.findById(newHos._id).populate("addedBy");

        return res.status(200).json({
            success:true,
            message:"hospital added successfully",
            final
        })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in adding hospital"
        })
    }
}
exports.edit=async(req,res)=>{
    try {

        const {id}=req.params;
        const body={...req.body};

        const updatedHos=await NearByHospital.findByIdAndUpdate(id,{
            ...body,
            addedBy:req.user._id
        },{new:true}).populate("addedBy");

        return res.status(200).json({
            success:true,
            message:"hospital updated successfully",
            final:updatedHos
        })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in updating hospital"
        })
    }
}
exports.deleteHos=async(req,res)=>{
    try {

        const {id}=req.params;

        await NearByHospital.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            message:"hospital deleted successfully"
        })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in deleting hospital"
        })
    }
}
exports.getAll=async(req,res)=>{
    try {
        const all=await NearByHospital.find().populate("addedBy","name").sort({createdAt:-1});

        return res.status(200).json({
            success:true,
            message:"hospital fetched successfully",
            all
        })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in fetching hospital"
        })
    }
}