const Notification=require('../Models/Notifications');


exports.add=async(req,res)=>{
    try {

        const {title}=req.body;

        const newEvent=await Notification.create({
                title,
                addedBy:req.user._id
        })

        return res.status(200).json({
            success:true,
            message:"Event added successfully",
            newEvent
        })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Error in adding event"
        })
    }
}

exports.getAll=async(req,res)=>{
    try {


        const allEvent=await Notification.find().sort({ createdAt: -1 });;

        return res.status(200).json({
            success:true,
            message:"Event fetched successfully",
            allEvent
        })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Error in fetching event"
        })
    }
}

exports.deleteNoti=async(req,res)=>{
    try {

        const {id}=req.params;
        await Notification.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            message:"Event deleted successfully"
        })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Error in deleting event"
        })
    }
}
// delete,add,get