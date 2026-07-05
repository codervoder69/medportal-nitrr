const History=require('../Models/History');
const Medicine=require('../Models/Medicine');

exports.addHistory=async(req,res)=>{
    try {

        const {roll,student,medicines}=req.body;

        let medicineData=medicines.map((elt)=>{
            let {_id,name,requiredQuantity}=elt;
            return {_id,name,requiredQuantity}
        })

        medicineData.map(async(item)=>{
            let medicineData=await Medicine.findById(item._id);
            let leftQt=parseInt(medicineData.quantity)-parseInt(item.requiredQuantity)
            medicineData.quantity=leftQt.toString();
            await medicineData.save();
        })

        const addData=await History.create({roll,student,medicines});

        return res.status(200).json({
            success:true,
            message:"History Added"

        })
         
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Error in adding History"
        })
    }
}

exports.getByMonth=async(req,res)=>{
    try {


        const {month,year}=req.query;
        const monthIdx=new Date(`${month} 1,${year}`).getMonth();

        const startDate=new Date(year,monthIdx,1); 
        const endDate=new Date(year,monthIdx+1,1); 

        const history=await History.find({
            createdAt:{$gte:startDate,$lt:endDate}
        }).populate("student").sort({createdAt:-1});


        return res.status(200).json({
            success:true,
            message:"successfull fetching History by month",
            history
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Error in fetching History by month"
        })
    }
}

exports.getByRoll=async(req,res)=>{
    try {
        const {roll}=req.query;
        const details=await History.find({roll:roll}).populate("student").sort({createdAt:-1});
        if(details.length===0){
            return res.status(400).json({
                success:false,
                message:"No prior data"
            })
        }
        return res.status(200).json({
            success:true,
            message:"fetched success",
            details
        })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Error in fetching"
        })
    }
}