const Gallery=require('../Models/Gallery')

exports.add=async(req,res)=>{
    try {

        const {link}=req.body;
        const newImg=await Gallery.create({link,addedBy:req.user._id});

        return res.status(200).json({
            success:true,
            message:"Added successfully",
            newImg
        }) 
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in adding"
        })
    }
}
exports.getAll=async(req,res)=>{
    try {

        const allImg=await Gallery.find();

        return res.status(200).json({
            success:true,
            message:"fetched successfully",
            allImg
        }) 
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in fetching"
        })
    }
}
exports.deteletImg=async(req,res)=>{
    try {

        const {id}=req.params;
        await Gallery.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            message:"deleted successfully"
        }) 
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in deleting"
        })
    }
}